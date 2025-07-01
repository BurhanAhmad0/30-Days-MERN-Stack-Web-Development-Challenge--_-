const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const authMiddleware = require("../../Middlewares/authMiddleware");
const validateProduct = require("../../Middlewares/validateProduct");

let products = [
  {
    id: "b3fcd3a2-0b0c-42b3-9e6e-69cf218f0c94",
    title: "Eco-Friendly Bamboo Toothbrush",
    description:
      "A sustainable alternative to plastic toothbrushes, made from biodegradable bamboo.",
  },
  {
    id: "bd479a4d-1799-47c2-9124-39fffcce2391",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 20 hours of battery life.",
  },
  {
    id: "40de733a-984b-4d60-b476-2baf75ed7fbd",
    title: "Organic Cotton T-Shirt",
    description:
      "Soft and breathable t-shirt made with 100% certified organic cotton.",
  },
  {
    id: "dcce4ac9-75df-4c3a-b2f0-654b6c1e82a6",
    title: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch controls and built-in USB charging port.",
  },
  {
    id: "76e78867-e398-403f-b4be-61d1829d62e9",
    title: "Stainless Steel Water Bottle",
    description:
      "Double-walled, vacuum-insulated bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "5d87a48f-b263-4b32-81a2-0d1cb207665b",
    title: "Bluetooth Fitness Tracker",
    description:
      "Wearable tracker that monitors heart rate, steps, sleep, and more with smartphone integration.",
  },
  {
    id: "9b40a24e-5a71-4de2-96e5-0970534a66b2",
    title: "Minimalist Leather Wallet",
    description:
      "Compact and durable wallet made with genuine leather, featuring RFID blocking.",
  },
  {
    id: "dfe37b5e-91a9-41aa-8a3f-2fda3d7e9a7e",
    title: "Portable Solar Charger",
    description:
      "Lightweight solar panel charger suitable for hiking, camping, and outdoor activities.",
  },
  {
    id: "e29b8d2e-5809-4172-90a2-68f83e30244e",
    title: "Ceramic Coffee Mug",
    description:
      "Handcrafted ceramic mug with a unique glaze, microwave and dishwasher safe.",
  },
  {
    id: "8a5b93fd-daf1-4ef9-96c6-245b6d3e9619",
    title: "Wooden Standing Desk Converter",
    description:
      "Ergonomic desk riser made from polished wood, ideal for sit-stand transitions.",
  },
  {
    id: "b3fcd3a2-0b0c-42b3-9e6e-69cf218f0c94",
    title: "Eco-Friendly Bamboo Toothbrush",
    description:
      "A sustainable alternative to plastic toothbrushes, made from biodegradable bamboo.",
  },
  {
    id: "bd479a4d-1799-47c2-9124-39fffcce2391",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 20 hours of battery life.",
  },
  {
    id: "40de733a-984b-4d60-b476-2baf75ed7fbd",
    title: "Organic Cotton T-Shirt",
    description:
      "Soft and breathable t-shirt made with 100% certified organic cotton.",
  },
  {
    id: "dcce4ac9-75df-4c3a-b2f0-654b6c1e82a6",
    title: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch controls and built-in USB charging port.",
  },
  {
    id: "76e78867-e398-403f-b4be-61d1829d62e9",
    title: "Stainless Steel Water Bottle",
    description:
      "Double-walled, vacuum-insulated bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "5d87a48f-b263-4b32-81a2-0d1cb207665b",
    title: "Bluetooth Fitness Tracker",
    description:
      "Wearable tracker that monitors heart rate, steps, sleep, and more with smartphone integration.",
  },
  {
    id: "9b40a24e-5a71-4de2-96e5-0970534a66b2",
    title: "Minimalist Leather Wallet",
    description:
      "Compact and durable wallet made with genuine leather, featuring RFID blocking.",
  },
  {
    id: "dfe37b5e-91a9-41aa-8a3f-2fda3d7e9a7e",
    title: "Portable Solar Charger",
    description:
      "Lightweight solar panel charger suitable for hiking, camping, and outdoor activities.",
  },
  {
    id: "e29b8d2e-5809-4172-90a2-68f83e30244e",
    title: "Ceramic Coffee Mug",
    description:
      "Handcrafted ceramic mug with a unique glaze, microwave and dishwasher safe.",
  },
  {
    id: "8a5b93fd-daf1-4ef9-96c6-245b6d3e9619",
    title: "Wooden Standing Desk Converter",
    description:
      "Ergonomic desk riser made from polished wood, ideal for sit-stand transitions.",
  },
  {
    id: "b3fcd3a2-0b0c-42b3-9e6e-69cf218f0c94",
    title: "Eco-Friendly Bamboo Toothbrush",
    description:
      "A sustainable alternative to plastic toothbrushes, made from biodegradable bamboo.",
  },
  {
    id: "bd479a4d-1799-47c2-9124-39fffcce2391",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 20 hours of battery life.",
  },
  {
    id: "40de733a-984b-4d60-b476-2baf75ed7fbd",
    title: "Organic Cotton T-Shirt",
    description:
      "Soft and breathable t-shirt made with 100% certified organic cotton.",
  },
  {
    id: "dcce4ac9-75df-4c3a-b2f0-654b6c1e82a6",
    title: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch controls and built-in USB charging port.",
  },
  {
    id: "76e78867-e398-403f-b4be-61d1829d62e9",
    title: "Stainless Steel Water Bottle",
    description:
      "Double-walled, vacuum-insulated bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "5d87a48f-b263-4b32-81a2-0d1cb207665b",
    title: "Bluetooth Fitness Tracker",
    description:
      "Wearable tracker that monitors heart rate, steps, sleep, and more with smartphone integration.",
  },
  {
    id: "9b40a24e-5a71-4de2-96e5-0970534a66b2",
    title: "Minimalist Leather Wallet",
    description:
      "Compact and durable wallet made with genuine leather, featuring RFID blocking.",
  },
  {
    id: "dfe37b5e-91a9-41aa-8a3f-2fda3d7e9a7e",
    title: "Portable Solar Charger",
    description:
      "Lightweight solar panel charger suitable for hiking, camping, and outdoor activities.",
  },
  {
    id: "e29b8d2e-5809-4172-90a2-68f83e30244e",
    title: "Ceramic Coffee Mug",
    description:
      "Handcrafted ceramic mug with a unique glaze, microwave and dishwasher safe.",
  },
  {
    id: "8a5b93fd-daf1-4ef9-96c6-245b6d3e9619",
    title: "Wooden Standing Desk Converter",
    description:
      "Ergonomic desk riser made from polished wood, ideal for sit-stand transitions.",
  },
  {
    id: "b3fcd3a2-0b0c-42b3-9e6e-69cf218f0c94",
    title: "Eco-Friendly Bamboo Toothbrush",
    description:
      "A sustainable alternative to plastic toothbrushes, made from biodegradable bamboo.",
  },
  {
    id: "bd479a4d-1799-47c2-9124-39fffcce2391",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 20 hours of battery life.",
  },
  {
    id: "40de733a-984b-4d60-b476-2baf75ed7fbd",
    title: "Organic Cotton T-Shirt",
    description:
      "Soft and breathable t-shirt made with 100% certified organic cotton.",
  },
  {
    id: "dcce4ac9-75df-4c3a-b2f0-654b6c1e82a6",
    title: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch controls and built-in USB charging port.",
  },
  {
    id: "76e78867-e398-403f-b4be-61d1829d62e9",
    title: "Stainless Steel Water Bottle",
    description:
      "Double-walled, vacuum-insulated bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "5d87a48f-b263-4b32-81a2-0d1cb207665b",
    title: "Bluetooth Fitness Tracker",
    description:
      "Wearable tracker that monitors heart rate, steps, sleep, and more with smartphone integration.",
  },
  {
    id: "9b40a24e-5a71-4de2-96e5-0970534a66b2",
    title: "Minimalist Leather Wallet",
    description:
      "Compact and durable wallet made with genuine leather, featuring RFID blocking.",
  },
  {
    id: "dfe37b5e-91a9-41aa-8a3f-2fda3d7e9a7e",
    title: "Portable Solar Charger",
    description:
      "Lightweight solar panel charger suitable for hiking, camping, and outdoor activities.",
  },
  {
    id: "e29b8d2e-5809-4172-90a2-68f83e30244e",
    title: "Ceramic Coffee Mug",
    description:
      "Handcrafted ceramic mug with a unique glaze, microwave and dishwasher safe.",
  },
  {
    id: "8a5b93fd-daf1-4ef9-96c6-245b6d3e9619",
    title: "Wooden Standing Desk Converter",
    description:
      "Ergonomic desk riser made from polished wood, ideal for sit-stand transitions.",
  },
];

router.get("/products", async (req, res) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limit;

  const paginatedProducts = products.slice(skip, skip + limitNumber);
  const total = products.length;

  res.send({
    message: "Get Products",
    currentPage: pageNumber,
    totalProducts: products.length,
    totalCount: total,
    products: paginatedProducts,
  });
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send({
      message: "Product not found",
    });
  }

  res.send({
    message: "Get Products",
    product,
  });
});

router.post("/products", validateProduct, authMiddleware, (req, res) => {
  const { title, description } = req.body;

  const newProduct = {
    id: uuidv4(),
    title,
    description,
  };

  products.push(newProduct);

  res.send({
    message: "Product added successfully",
  });
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send({
      message: "Product not found",
    });
  }

  product.title = title;
  product.description = description;

  res.send({
    message: "Product updated successfully",
  });
});

router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return res.status(404).send({
      message: "Product not found",
    });
  }
  products.splice(productIndex, 1);
  res.send({
    message: "Product deleted successfully",
  });
});

module.exports = router;
