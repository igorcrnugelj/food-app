import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { fiboLength } = req.body;

  let c;
  let arr = [1, 1];
  const getFib = (a, b) => {
    c = b + a;
    arr.push(c);
    if (c < fiboLength) {
      getFib(b, c);
    }
  };
  getFib(1, 1);
  console.log(...arr);

  res.send(arr);
});

export default router;
