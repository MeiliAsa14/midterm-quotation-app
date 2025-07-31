import { useState } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0].code);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);

  const [dataItems, setDataItems] = useState([]);

  const handleProductChange = (event) => {
    const newCode = event.target.value;
    setSelectedProduct(newCode);

    const item = products.find((p) => p.code === newCode);
    setPpu(item.price);
  };

  const addItem = () => {
    const item = products.find((p) => p.code === selectedProduct);

    const newItem = {
      item: item.name,
      ppu,
      qty,
      discount,
    };

    setDataItems([...dataItems, newItem]);
    setQty(1);
    setDiscount(0);
  };

  const deleteByIndex = (index) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        {/* LEFT SIDE FORM */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#e4e4e4",
              padding: "16px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "16px", // space between fields
            }}
          >
            <Typography variant="h6">Add Item</Typography>

            {/* Item Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Item</InputLabel>
              <Select value={selectedProduct} onChange={handleProductChange}>
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price per Unit */}
            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              value={ppu}
              onChange={(e) => setPpu(Number(e.target.value))}
            />

            {/* Quantity */}
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />

            {/* Discount */}
            <TextField
              label="Discount"
              type="number"
              fullWidth
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />

            {/* Add Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addItem}
              sx={{ fontWeight: "bold" }}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/* RIGHT SIDE TABLE */}
        <Grid item xs={12} md={8}>
          <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
