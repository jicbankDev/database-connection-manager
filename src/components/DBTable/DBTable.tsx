import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { IDatabase } from '../../types/Database.type';


type Props = {
    databases: IDatabase[]
}

const DBTable = (props: Props) => {

    const { databases } = props;
    return <>
    <Table>
        <TableHead>
          <TableRow >
            <TableCell>Database Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Database Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {databases.map((db) => (
              <TableRow key={db.id} >
              <TableCell>{db.name}</TableCell>
              <TableCell>{db.username}</TableCell>
              <TableCell>{db.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
}
export default DBTable