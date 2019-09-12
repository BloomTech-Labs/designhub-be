const go = require('../utils/crud');

exports.createUser = async (req, res) => {
  try {
    const response = await go.createOne('users', 'id', req.body);
    return res
      .status(201)
      .json({ message: 'Account successfully created!', response });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        errorHelp: { response: response, req: req.body },
        message: "Couldn't create account",
        err
      });
  }
  //   go.createOne('users', 'id', req.body)
  //     .then(response => {
  //       console.log(response);
  //       return res
  //         .status(201)
  //         .json({ message: 'Account successfully created!', response });
  //     })
  //     .catch(err => res.status(400).send(err));
};
