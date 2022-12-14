function adapt(obj) {
  return {
    flowerId: +obj.flowerId,
    name: obj.name,
    unitPrice: +obj.unitPrice,
    farmer: obj.farmer,
    stock: +obj.stock,
  };
}

module.exports = { adapt };
