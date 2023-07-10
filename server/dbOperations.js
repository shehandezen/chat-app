const getData = async (findObject, model) => {
  const data = await model.find(findObject);
  return data;
};

const getDataById = async (id, model) => {
  const data = await model.findById(id);
  return data;
};

const addData = async (data, model) => {
  const result = new model(data);
  await result.save();
  return result;
};

const updateData = async (id, data, model) => {
  const result = await model.findByIdAndUpdate(id, data, { new: true });

  return result;
};

const deleteData = async (id, model) => {
  const data = await model.findByIdAndDelete(id);
  return data;
};

module.exports = { getData, addData, updateData, deleteData, getDataById };
