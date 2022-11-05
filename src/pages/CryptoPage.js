import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableHead,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';

export default function CryptoPage() {
  const [cryptosData, setCryptosData] = useState([]);
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'current_price', label: 'Current Price', minWidth: 100 },
    {
      id: 'market_cap',
      label: 'Market Cap',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'price_change_percentage_1h_in_currency',
      label: '1h',
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'price_change_percentage_24h_in_currency',
      label: '24h',
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'price_change_percentage_7d_in_currency',
      label: '7d',
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'price_change_percentage_1y_in_currency',
      label: '1y',
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatNumber = (num) => {
    return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  };

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C1y'
      )
      .then((response) => {
        setCryptosData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Crypto | Results </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crypto
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table
                sx={{
                  '& thead th': {
                    backgroundColor: 'background.neutral',
                    color: 'text.primary',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  },
                  '& tbody tr': {
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'background.neutral',
                    },
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cryptosData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover key={row.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={row.name} src={row.image} />
                          <Typography variant="subtitle2" noWrap>
                            {row.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {row.current_price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {row.market_cap}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            color: row.price_change_percentage_1h_in_currency > 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {formatNumber(row.price_change_percentage_1h_in_currency)}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            color: row.price_change_percentage_24h_in_currency > 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {formatNumber(row.price_change_percentage_24h_in_currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            color: row.price_change_percentage_7d_in_currency > 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {formatNumber(row.price_change_percentage_7d_in_currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            color: row.price_change_percentage_1y_in_currency > 0 ? 'success.main' : 'error.main',
                          }}
                        >
                          {row.price_change_percentage_1y_in_currency}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={cryptosData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
