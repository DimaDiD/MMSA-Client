import { Button, Table } from "antd"
import { TableData } from "../models/TableData";
import CalculationService from "../services/calculation-service";
import { useTable } from "../Store";

const MainTable = () => {
    let api = new CalculationService();
    const [state, actions] = useTable();

    const getStringFromArray = (data: number[][]) =>{
        const result: Array<string> = []
        data.map((item) => {
          const stringifiedNumbers: string = item.join(', ');
          result.push(stringifiedNumbers)
        })
  
        return result;
      };

    const handleDownload = async () => {                   

        const newTableData: TableData = {
          CalculationResults: getStringFromArray(state.tableValues)
        }

        await api.downloadTable(newTableData)
            .then((res) => {               
              const excelBytes = atob(res);
              const arrayBuffer = new ArrayBuffer(excelBytes.length);
              const view = new Uint8Array(arrayBuffer);
              for (let i = 0; i < excelBytes.length; i++) {
                view[i] = excelBytes.charCodeAt(i);
              }
              const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'data.xlsx';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            });                          
      };
      
    return (
        <div style={{margin: "50px 150px 50px 150px"}}>
            <Table columns={state.columns} dataSource={state.dataTable} pagination={false} bordered={true} title ={() => "Власні значення"}/>
            <Button 
              onClick={handleDownload} 
              style={{margin:"15px 0 15px 00"}}
              type="primary"
              htmlType="submit"
              >
                Зберегти
              </Button>
          </div>
    )
}

export default MainTable