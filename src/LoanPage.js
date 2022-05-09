import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@material-ui/core';

export default function LoanPage() {
  const { userId } = useParams()
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)

  function loadBarang() {
    fetch(`http://localhost:5000/peminjamans/user/${userId}`)
      .then(response => response.json())
      .then(({user, data}) => {
        setItems(data)
        setUser(user)
      });
  }

  useEffect(() => {
    loadBarang()
  }, [])

  const UserNotFound = () => (
    <Typography align="center">
      User Tidak Ditemukan
    </Typography>
  )
  const ListBarang = () => (
    <>
      {
        ((user && items.length) && (
          <>
            <Typography>Baarang yang dipinjam oleh <strong>{user.nama}</strong></Typography>
            <hr />
            <table className='custom-table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Barang</th>
                  <th>Kode Barang</th>
                  <th>No Asset</th>
                  <th>Tgl Pinjam</th>
                  <th>Departmen</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item, index) => (
                    <tr key={item.peminjaman_id}>
                      <td>{++index}</td>
                      <td>{item.nama_barang}</td>
                      <td>{item.kode_barang}</td>
                      <td>{item.no_asset}</td>
                      <td>{item.tanggal_pinjam}</td>
                      <td>{item.department}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        )) || <Typography align="center">Belum ada barang yang dipinjam oleh <strong>{user.nama}</strong></Typography>
      }
    </>
  )

  return (
    <div style={{
      width: '800px',
      maxWidth: '100%',
      margin: 'auto'
    }}>
      { (user && <ListBarang/>) || <UserNotFound /> }
    </div>
  )
}