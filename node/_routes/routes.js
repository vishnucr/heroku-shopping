const jwt = require("jsonwebtoken");
const moment = require("moment");
const LocalStorage = require("node-localstorage").LocalStorage;
const { b64decode } = require("../_services/helper");
const { UserModel } = require("../_schemas/userSchema");
const { UsernameModel } = require("../_schemas/usernameSchema");
const { OrderModel } = require("../_schemas/orderSchema");
const { ItemModel } = require("../_schemas/itemSchema");
const { Response } = require("../_models/response.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;

localStorage = new LocalStorage("./scratch");

function verifyUser(basicToken) {
  //  Native b64 encode decode
  // console.log(Buffer.from('Hello World!').toString('base64'));
  // console.log(Buffer.from('W29iamVjdCBPYmplY3RdOltvYmplY3QgT2JqZWN0XQ==','base64').toString());
  const basicToken_decoded = b64decode(basicToken.split(" ")[1]); //Basic 4dnsdnfi4ui434u3=
  const username = basicToken_decoded.split(":")[0]; //username:password
  const promise = new Promise((resolve, reject) => {
    UsernameModel.find({ username }, (err, user) => {
      if (err) {
        reject(err);
        throw err;
      }
      //Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
      if (user.length > 0) {
        let t = jwt.sign({ username: username }, process.env.AUTH_TOKEN_KEY); // , { expiresIn: 3600 } 60 seconds
        let rt = jwt.sign(
          { username: username },
          process.env.AUTH_REFRESH_TOKEN_KEY
        );
        resolve({ t, rt });
      }
      resolve(false);
    });
  });
  return promise;
}

var ROUTER = function (router, db) {
  // *************************************** USERS

  // Login - Basic Auth
  router.get("/login", (req, res) => {
    console.log(req.headers.authorization, new Date().getMinutes());
    verifyUser(req.headers.authorization).then((token) => {
      let response;
      token
        ? (response = new Response(true, "User Found", token))
        : (response = new Response(false, "User Not Found"));
      res.json(response.send());
    });
  });

  // Register - Basic Auth (User is added here)
  router.post("/register", (req, res) => {
    const basicToken_decoded = b64decode(
      req.headers.authorization.split(" ")[1]
    ); //Basic 4dnsdnfi4ui434u3=
    const username = basicToken_decoded.split(":")[0]; //username:password
    const password = basicToken_decoded.split(":")[1]; //username:password
    UsernameModel.find({ username }, (err, user) => {
      if (err) throw err;
      if (user.length > 0) {
        res.json({ message: "User already exists" });
        return false;
      } else {
        // Creating user document
        const _user = new UserModel({
          _id: new mongoose.Types.ObjectId(),
          username
        });
        _user.save().then((response) => {
          // Creating username document
          const _username = new UsernameModel({
            _id: new mongoose.Types.ObjectId(),
            username,
            password,
            user: response._id // referencing user id
          });
          bcrypt.hash(password, saltRounds, (err, hash) => {
            _username.password = hash;
            _username.save();
          });
          res.json({ message: "User Created", id: response.id, username });
        });
      }
    });
  });

  // Get User by id
  router.get("/user/:id", (req, res) => {
    // id will be available in req.params. url query will be available in req.query
    const _token = req.headers.authorization;
    const { id } = req.params;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        UserModel.find({ _id: id }, (err, users) => {
          if (err) res.json(err);
          res.json(users);
        });
      }
    });
  });

  // UPDATE User
  //TODO: {change username to _id}
  router.patch("/user", (req, res) => {
    const query = { username: req.body.username };
    const _token = req.headers.authorization;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        UserModel.findOneAndUpdate(
          query,
          req.body,
          { new: true },
          (err, doc) => {
            if (doc) {
              return res.json({ message: "Succesfully saved", data: doc });
            }
            return res.json({
              message: "User does not exist, please create one or signup"
            });
          }
        );
      }
    });
  });

  // GET Users
  router.get("/users", (req, res) => {
    const _token = req.headers.authorization;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        UserModel.find({}, (err, users) => {
          if (err) res.json({ message: "Users not found", err });
          res.json(users);
        });
      }
    });
  });

  // *************************************** ITEMS
  // CREATE Item
  router.post("/item", (req, res) => {
    const _token = req.headers.authorization;
    const data = req.body;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid".err });
      } else {
        let { id } = data;
        if (id) {
          // {new: true} to get new version of doc rather than old doc
          ItemModel.findByIdAndUpdate(
            id,
            { ...data },
            { new: true },
            (err, item) => {
              item
                ? res.json({ item })
                : res.json({ message: "Item not found" });
            }
          );
        } else {
          const _item = new ItemModel({
            _id: new mongoose.Types.ObjectId(),
            ...data
          });
          _item.save();
          res.json(_item);
        }
      }
    });
  });

  // GET Items
  router.get("/items", (req, res) => {
    const _token = req.headers.authorization;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        ItemModel.find({}, (err, items) => {
          if (err) res.json({ message: "Items not found", err });
          res.json(items);
        });
      }
    });
  });

  // Get Item by id
  router.get("/item/:id", (req, res) => {
    // id will be available in req.params. url query will be available in req.params
    const _token = req.headers.authorization;
    const { id } = req.params;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        ItemModel.find({ _id: id }, (err, users) => {
          if (err) res.json(err);
          res.json(users);
        });
      }
    });
  });

  // *************************************** ORDERS
  // CREATE ORDER
  router.post("/order", (req, res) => {
    const _token = req.headers.authorization;
    let data = req.body;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token Invalid".err });
      } else {
        const _order = new OrderModel({
          _id: new mongoose.Types.ObjectId(),
          ...data
        });
        _order.save().then(
          (order) => {
            OrderModel.populate(order, { path: "user" }, function (err, doc) {
              res.status(200).json({ message: "Succesfully saved", data: doc });
            });
          },
          (err) => {
            res.status(500).json({ message: "Cannot Create Order", err });
            console.log(err);
          }
        );
      }
    });
  });

  // UPDATE ORDER
  router.patch("/order", (req, res) => {
    const query = { _id: req.body._id };
    const _token = req.headers.authorization;
    let data = req.body;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid".err });
      } else {
        OrderModel.findOneAndUpdate(query, data, { new: true })
          .populate("user")
          .exec((err, doc) => {
            if (doc) {
              return res.json({ message: "Succesfully saved", data: doc });
            }
            return res.json({
              message: `No order found for id ${req.body._id}`
            });
          });
      }
    });
  });

  // GET Orders
  router.get("/orders", (req, res) => {
    const _token = req.headers.authorization;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        OrderModel.find({})
          .populate("user")
          .exec(function (err, orders) {
            if (err) res.json(err);
            res.json(orders);
          });
      }
    });
  });

  // Get Order by id
  router.get("/orders/:id", (req, res) => {
    // id will be available in req.params. url query will be available in req.params
    console.log(req.params, req.query);
    const _token = req.headers.authorization;
    const { id } = req.params;
    jwt.verify(_token, process.env.AUTH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Token Invalid", err });
      } else {
        OrderModel.findOne({ _id: id })
          .populate("user")
          .exec(function (err, orders) {
            if (err) res.status(404).json(err);
            res.json(orders);
          });
      }
    });
  });
};

module.exports = ROUTER;

// 18002583838

// BOSE 12064 - 6979
// AC 	34470 - 5978

// TV 	42000 - 15643
// BENQ 33215 - 31203 + 12064 + 9480 = 53256 + 15643 = 67380

// total - 54149
