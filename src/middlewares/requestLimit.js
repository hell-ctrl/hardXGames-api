import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: "Você excedeu o limite de requisições para esta API.",
});

export default limiter;