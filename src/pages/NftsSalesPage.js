import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import FormDialog from './DialogNft';

export default function NftsSalesPage() {
  const [nftsData, setNftsData] = useState([]);
  const [columns, setColumns] = useState([
    { id: 'rank', label: 'Rank', align: 'left' },
    { id: 'tokens.imageURL', label: 'Image', align: 'left' },
    { id: 'tokens.name', label: 'Name', align: 'left' },
    { id: 'collectionName', label: 'Collection Name', align: 'left' },
    { id: 'marketplaceName', label: 'Marketplace', align: 'left' },
    { id: 'quote.USD.price', label: 'Price', align: 'left' },
    { id: 'quote.ETH.price', label: 'Price ETH', align: 'left' },
  ]);

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
    return num?.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    console.log('useEffect');
    // You have to supply your API Key via a custom header: X-BLOBR-KEY
    // IImnd5Pztx7eDkkoZUH1x6q3unzFnOM5
    fetch('https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/sales/top-100', {
      method: 'GET',
      headers: {
        'X-BLOBR-KEY': 'IImnd5Pztx7eDkkoZUH1x6q3unzFnOM5',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        setNftsData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Helmet>
        <title> NFT | Sales </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            NFT | Sales
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
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ py: 3 }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nftsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow hover key={row.id}>
                        <TableCell align="left">{row.rank}</TableCell>
                        <TableCell align="left">
                          <Avatar
                            alt={row.tokens.name}
                            src={row.tokens[0].imageURL}
                            variant="rounded"
                            sx={{ width: 100, height: 100 }}
                          />
                        </TableCell>
                        <TableCell align="left">{row.tokens[0].name}</TableCell>
                        <TableCell align="left" sx={{ maxWidth: 200 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              alt={row.collectionName}
                              src={row.collectionImageURL}
                              variant="rounded"
                              sx={{ width: 48, height: 48 }}
                              style={{ marginRight: 10 }}
                            />
                            {row.collectionName}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              alt={row.marketplaceName}
                              src={row.marketplaceIcon}
                              variant="rounded"
                              sx={{ width: 48, height: 48 }}
                              style={{ marginRight: 10 }}
                            />
                            {row.marketplaceName}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {row.quote.USD.price ? `${formatNumber(row.quote.USD.price)}$` : ''}
                        </TableCell>
                        {row.quote.ETH ? (
                          <TableCell align="left">{formatNumber(row.quote.ETH.price)} ETH</TableCell>
                        ) : (
                          <TableCell align="left">-</TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={nftsData.length}
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
