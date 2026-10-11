import { Router } from "express";

const router = Router();

// Заявки хранятся в памяти: при перезапуске сервера пропадут
const orders = [];
let nextId = 1;

// GET /api/orders
router.get("/", (req, res) => {
  res.json(orders);
});

// POST /api/orders
router.post("/", (req, res) => {
  const { name, email, phone, quantity, date, comment } = req.body || {};

  if (!name || !email || !quantity) {
    return res.status(400).json({ error: "Поля name, email и quantity обязательны" });
  }

  if (Number(quantity) < 10) {
    return res.status(400).json({ error: "Минимальный объём заказа — 10 кг" });
  }

  const order = {
    id: nextId++,
    name, email, phone, date, comment,
    quantity: Number(quantity),
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
});

export default router;
