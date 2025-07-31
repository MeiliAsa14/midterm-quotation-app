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
  Paper,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

// The app pre-fills the data from this list, preserving the feature.
const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  // --- State Management ---
  const [selectedProduct, setSelectedProduct] = useState(products[0].code);
  // FIX: Initialize ppu (Price Per Unit) with an empty string.
  const [ppu, setPpu] = useState('');
  const [qty, setQty] = useState(1);
  // FIX: Initialize discount with an empty string.
  const [discount, setDiscount] = useState('');
  const [dataItems, setDataItems] = useState([]);

  // --- Event Handlers ---
  const handleProductChange = (event) => {
    const newCode = event.target.value;
    setSelectedProduct(newCode);
    const item = products.find((p) => p.code === newCode);
    if (item) {
      // When a product is selected, its price populates the field.
      setPpu(item.price);
    }
  };

  /**
   * Adds a new item to the quotation or merges it with an existing item
   * if the name and price are the same.
   */
  const addItem = () => {
    const productDetails = products.find((p) => p.code === selectedProduct);
    // Basic validation, ensuring price and quantity are valid.
    if (!productDetails || Number(qty) <= 0 || Number(ppu) <= 0) {
      return;
    }

    // Use Number() to handle empty strings, which correctly convert to 0.
    const numericDiscount = Number(discount);
    const numericPpu = Number(ppu);

    const existingItemIndex = dataItems.findIndex(
      (item) => item.item === productDetails.name && item.ppu === numericPpu
    );

    if (existingItemIndex > -1) {
      // Item is redundant, merge it.
      const updatedItems = [...dataItems];
      const existingItem = updatedItems[existingItemIndex];

      existingItem.qty = Number(existingItem.qty) + Number(qty);
      existingItem.discount = Number(existingItem.discount) + numericDiscount;

      setDataItems(updatedItems);
    } else {
      // Item is unique, add it as a new row.
      const newItem = {
        item: productDetails.name,
        ppu: numericPpu,
        qty: Number(qty),
        discount: numericDiscount,
      };
      setDataItems([...dataItems, newItem]);
    }

    // Reset form fields after adding/merging
    setQty(1);
    setDiscount('');
    // Clear the price field as well for a clean slate on the next item.
    setPpu('');
  };

  const deleteByIndex = (index) => {
    const newDataItems = dataItems.filter((_, i) => i !== index);
    setDataItems(newDataItems);
  };

  // Clears all items from the table.
  const clearAllItems = () => {
    setDataItems([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* LEFT SIDE FORM */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className="glass-card"
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Add Item to Quotation</Typography>

            <FormControl fullWidth>
              <InputLabel>Item</InputLabel>
              <Select value={selectedProduct} onChange={handleProductChange} label="Item">
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              value={ppu}
              // FIX: Update state with the raw string value to allow empty field.
              onChange={(e) => setPpu(e.target.value)}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              inputProps={{ min: 1 }}
            />

            {/* Discount Input Field */}
            <TextField
              label="Discount"
              type="number"
              fullWidth
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
              inputProps={{ min: 0 }}
            />

            <Button
              variant="contained"
              className="whale-btn"
              fullWidth
              onClick={addItem}
              sx={{ fontWeight: "bold", py: 1.5 }}
            >
              Add
            </Button>
          </Paper>
        </Grid>

        {/* RIGHT SIDE TABLE */}
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAllItems={clearAllItems}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
