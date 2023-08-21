const { findSubscriber, createSubscriber,findSubscriberById, updateSubscriber, findSubscriberByWhere, findAdminLembaga } = require('../models/sql/subscriberModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert subscriber
exports.createSubscriber = async (req, res) => {
  const data = req.body;
  
  try {
        const dataSubscriber =  await createSubscriber(data);
        if(dataSubscriber.status == "Sukses"){
          const response = {
            status:dataSubscriber.status,
            message:dataSubscriber.message,
            data:dataSubscriber.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataSubscriber.status,
            message:dataSubscriber.message,
            data:dataSubscriber.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data subscriber all
exports.searchSubscriber = async (req, res) => {
  try{

    const dataSubscriber = await findSubscriber();

    if (dataSubscriber.status == "Sukses") {
      const response = {
        status:dataSubscriber.status,
        message:dataSubscriber.message,
        data:dataSubscriber.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataSubscriber.status,
        message:dataSubscriber.message,
        data:dataSubscriber.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data subscriber by id
exports.findSubscriberById = async (req, res) => {
    const subscriberId = req.params.subscriberId;

    try{

      const subscriber = await findSubscriberById(subscriberId);
  
      if (subscriber.status == "Sukses") {
        const response = {
          status:subscriber.status,
          message:subscriber.message,
          data:subscriber.data
        }
        res.json(response);
      } else {
        const response = {
          status:subscriber.status,
          message:subscriber.message,
          data:subscriber.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update subscriber
exports.updateSubscriber = async (req, res) => {
  const subscriberId = req.params.subscriberId;
  const subscriberDatas =  req.body;
  
  try {
        const subscriberData =  await updateSubscriber(subscriberId, subscriberDatas);
        if(subscriberData.status == "Sukses"){
          const response = {
            status:subscriberData.status,
            message:subscriberData.message,
            data:subscriberData.data
          }
          res.json(response);
        }else{
          const response = {
            status:subscriberData.status,
            message:subscriberData.message,
            data:subscriberData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get subscriber by custom
exports.findSubscriberByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findSubscriberByWhere(DataWhere);

    if (dataWhere.status == "Sukses") {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
exports.findAdminLembaga = async (req, res) => {
  const npsn = req.params.npsn;
console.log(npsn)
  try{

    const dataWhere = await findAdminLembaga(npsn);

    if (dataWhere.status == "Sukses") {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};