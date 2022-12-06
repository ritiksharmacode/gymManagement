const mongoSave = async (res: any, useModel: any, useMessage: any, useData: any) => {
  try {
    const prepareSave = new useModel(useData);
    let savedData = await prepareSave.save();

    res
      .status(201)
      .json({ message: `new ${useMessage} save`, data: savedData });
  } catch (error: any) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
};

const mongoUpdate = async (res: any, useModel: any, useMessage: any, useData: any, useID: any) => {
  try {
    let savedData = await useModel.updateOne({ _id: useID }, useData);
    res.status(201).json({ message: `${useMessage} updated`, data: savedData });
  } catch (error: any) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
};

export { mongoSave, mongoUpdate };
