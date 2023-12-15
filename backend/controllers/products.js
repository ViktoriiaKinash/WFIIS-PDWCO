const driver = require('../config').driver;

exports.getProducts = async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.readTransaction(txc => txc.run('MATCH (p:Product) RETURN p'));
        const products = result.records.map(record => record.get('p').properties);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.addProduct = async (req, res) => {
    const { name, brand, price } = req.body;
    const session = driver.session();
    try {
        const result = await session.writeTransaction(txc =>
            txc.run(
                'MERGE (p:Product {name: $name}) ' +
                'ON CREATE SET p.age = $age, p.brand = $brand, p.price = $price ' +
                'RETURN p',
                { name, brand, price }
            )
        );
        const product = result.records[0].get('p').properties;
        res.status(201).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};

exports.deleteProduct = async (req, res) => {
    const productName = req.params.name;
    const session = driver.session();
    try {
        await session.writeTransaction(txc =>
            txc.run(
                'MATCH (p:Product {name: $productName}) ' +
                'DETACH DELETE p',
                { productName }
            )
        );
        res.status(200).send('Product ${productName} deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
    finally {
        await session.close();
    }
};