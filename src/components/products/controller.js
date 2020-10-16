const Product = require('./model');
const { validateData } = require('./validation');

exports.create = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

exports.index = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.send(allProducts);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.find = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

exports.update = async (req, res) => {
  const { error } = validateData(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).send(product);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

exports.destroy = async (req, res) => {
  if (!req.admin) return res.status(401).send('Access denied');

  try {
    const product = await Product.findByIdAndRemove(req.params.id, {
      new: true,
    });
    res.status(202).send(product);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};
