import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// FIX: Import PropTypes to validate component props
import PropTypes from 'prop-types';

// --- Helper Function for Currency Formatting ---
const formatCurrency = (amount) => {
  // Using Baht currency as an example from the instructions
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};

function QuotationTable({ data, deleteByIndex, clearAllItems }) {
  // --- Totals Calculation ---
  const calculateTotals = () => {
    const totalDiscount = data.reduce((acc, item) => acc + item.discount, 0);
    const grossTotal = data.reduce((acc, item) => acc + item.ppu * item.qty, 0);
    const total = grossTotal - totalDiscount;
    return { totalDiscount, total };
  };

  const { totalDiscount, total } = calculateTotals();

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Quotation
        </Typography>
        <Button variant="outlined" color="secondary" onClick={clearAllItems}>
          Clear
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell sx={{ width: '5%' }}></TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price/Unit</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => {
                // Amount for each row is (Qty * Price/Unit) - Discount
                const amount = item.ppu * item.qty - item.discount;
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <IconButton onClick={() => deleteByIndex(index)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{formatCurrency(item.ppu)}</TableCell>
                    <TableCell align="right">{formatCurrency(item.discount)}</TableCell>
                    <TableCell align="right">{formatCurrency(amount)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No items in quotation.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {/* Total Discount Row */}
            <TableRow sx={{ '& td': { fontWeight: 'bold', fontSize: '1.1rem' } }}>
              <TableCell colSpan={4} />
              <TableCell align="right">Total Discount:</TableCell>
              <TableCell align="right">{formatCurrency(totalDiscount)}</TableCell>
            </TableRow>
            {/* Final Total Row */}
            <TableRow sx={{ '& td': { fontWeight: 'bold', fontSize: '1.2rem' } }}>
              <TableCell colSpan={4} />
              <TableCell align="right">Total:</TableCell>
              <TableCell align="right">{formatCurrency(total)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

// FIX: Added PropTypes validation to resolve ESLint errors.
QuotationTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.string.isRequired,
    ppu: PropTypes.number.isRequired,
    qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    discount: PropTypes.number.isRequired,
  })).isRequired,
  deleteByIndex: PropTypes.func.isRequired,
  clearAllItems: PropTypes.func.isRequired,
};


export default QuotationTable;
