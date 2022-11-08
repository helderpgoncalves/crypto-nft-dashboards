import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import FormDialog from './DialogNft';

export default function NftsPage() {
  const [nftsData, setNftsData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { id: 'rank', label: 'Rank', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'symbol', label: 'Symbol', align: 'left' },
    { id: 'contract_address', label: 'Contract Address', align: 'left' },
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
    // You have to supply your API Key via a custom header: X-BLOBR-KEY
    // IImnd5Pztx7eDkkoZUH1x6q3unzFnOM5
    fetch('https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_desc')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setLoading(false);
          setNftsData(data);
        }
      });
  }, []);

  const showNFTdata = async (id) => {
    console.log('showNFTdata', id);
    await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setNftData(response);
        console.log('data', response);
        setOpen(true);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> NFT | Collections </title>
      </Helmet>

      {open && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          {nftData && (
            <>
              <DialogTitle>{nftData.name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <img src={nftData.image.small} alt={nftData.name} width="14%" />
                </DialogContentText>
                <br />
                <DialogContentText>
                  <b>Floor Price:</b> {nftData.floor_price.usd} USD
                  <br />
                  <b>Floor Price Change 24h:</b>{' '}
                  <a style={{ color: nftData.floor_price_in_usd_24h_percentage_change > 0 ? 'green' : 'red' }}>
                    {nftData.floor_price_in_usd_24h_percentage_change}%
                  </a>
                  <br />
                  <b>Market Cap:</b> {nftData.market_cap.usd} USD
                  <br />
                  <b>Volume 24h:</b> {nftData.volume_24h.usd} USD
                  <br />
                </DialogContentText>
                <hr />
                <DialogContentText>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {nftData.description}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            NFT | Collections
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            {loading ? (
              <Typography variant="h4" gutterBottom>
                Loading...
              </Typography>
            ) : (
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
                        <TableRow hover key={row.id} tabIndex={-1}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">
                            <Link href="#" onClick={() => showNFTdata(row.id)}>
                              <Stack direction="row" alignItems="center" spacing={2} style={{ cursor: 'pointer' }}>
                                <Typography variant="subtitle2" noWrap onClick={() => showNFTdata(row.id)}>
                                  {row.name}
                                </Typography>
                              </Stack>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{row.symbol}</TableCell>
                          <TableCell align="left">{row.contract_address}</TableCell>
                        </TableRow>
                      );
                    })}

                    {nftsData.length === 0 && (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          No data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
