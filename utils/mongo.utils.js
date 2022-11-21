const mongoSave = async (res, useModel, useMessage, useData) => {
  try {
    const prepareSave = new useModel(useData);
    let savedData = await prepareSave.save();

    res
      .status(201)
      .json({ message: `new ${useMessage} save`, data: savedData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
};

const mongoUpdate = async (res, useModel, useMessage, useData, useID) => {
  try {
    let savedData = await useModel.updateOne({ _id: useID }, useData);
    res.status(201).json({ message: `${useMessage} updated`, data: savedData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
};

export { mongoSave, mongoUpdate };
