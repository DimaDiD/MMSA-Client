import CalculationService from "../services/calculation-service";
import Plot from "react-plotly.js";
import { UpOutlined } from '@ant-design/icons';
import { Layout, Button, Form, Input, Row } from 'antd';
import { useTable } from '../Store';
import { Footer } from 'antd/es/layout/layout';
import "../pages/mainStyles.css";
import randomColor from "randomcolor";
import leftBrace from "../Photos/LeftBrace.png";
import operator from "../Photos/Operator.png";
import MainTable from '../components/MainTable';

const { Header, Content } = Layout;

export const MainPage = () => {
    let api = new CalculationService();
    const [state, actions] = useTable();
    const [form] = Form.useForm();

    const makeCalculations = async (values: any) => {    
        let v = values.g
        let c = v.split(',')

        const newCalculationSettings = {
          InputFunction: encodeURIComponent(values.inputFunction),
          OperatorValues: [encodeURIComponent(c[0]), encodeURIComponent(c[1])],
          Operators: [encodeURIComponent(values.Operator1), encodeURIComponent(values.Operator2)],
          Scopes: [encodeURIComponent(values.Scope1), encodeURIComponent(values.Scope2)],
          LeftSide: encodeURIComponent(values.leftSide),
          RightSide: encodeURIComponent(values.rigthSide)
          };   

          await api.makeClaculation(newCalculationSettings)
          .then((res) => {    
            let mu = res.mu.reverse()
            mu.shift() 
            const filteredArray = res.plotFXi.filter((item: any) => Array.isArray(item) && item.length > 0);
            MakeColumns(mu);
            actions.setTableValues(mu)
            actions.setFunctionValues(filteredArray)
            actions.setGraphXis(res.plotXi)                        
          });          
          
          
      };
    
    
    const MakeColumns = async (tableValues: any[][]) => {    
      const newColumns: any = [
        {
          title: `Номер ітерації n`,
          dataIndex: `iteration`,
          key: `iteration`,
          align: 'center'
        }        
      ];

      (tableValues).map((value: any[], index: number) => {
        newColumns.push(
          {
            title: `U${index+1}`,
            dataIndex: `U${index+1}`,
            key: `U${index+1}`,            
            align: 'center'
          })
      })

      const dataSource = tableValues.map((row, i) => {        
        let rowData: any = { key: i };
        rowData[`iteration`] = i+1
        row.forEach((cell, j) => {
          rowData[`U${j + 1}`] = cell;
        });
        return rowData;
      });      

      actions.setDataTable(dataSource);
      actions.setTableColumns(newColumns);  
    }

    const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); 

    return (   
      <Layout>
        <Header className='header'>  
          <div style={{height: "100%", justifyContent: "center"}}>MMSA</div>
        </Header> 

        <Content style={{ margin: "0px 50px 0px 50px", background: "white", display: "flex", justifyContent:"center", flexDirection:"column", height:"100%"}}>

        <Form
          name="basic"
          onFinish={makeCalculations}
          form={form}
          id="area"
          style={{display:"flex", justifyContent:"center"}}
        >
          <div style={{display: "flex", alignItems:"center", flexDirection:"column"}}>
              <Row justify={'center'} style={{height: "75px", fontWeight: '600', fontSize: '30px'  }}>                
                Вигляд оператора
              </Row>
              <Row justify={'center'}>                
                <img src={operator} alt="" className="curly-brace-left"/>
              </Row>
              <Row>
                <Form.Item
                  label="a"
                  name="leftSide"
                  rules={[
                    {
                      required: true,
                      message: "Поле є пустим!",
                    }]}
                >
                <Input                
                  className='inputFunction'
                  placeholder="Введіть межу..."
                  maxLength={100}
                />
                </Form.Item>
                <Form.Item
                  label="b"
                  name="rigthSide"
                  rules={[
                    {
                      required: true,
                      message: "Поле є пустим!",
                    }]}
                  >
                <Input                
                  className='inputFunction'
                  placeholder="Введіть межу..."
                />
                </Form.Item>
            </Row>
            <Row style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
              <div style={{display:"flex", verticalAlign:"center", width:"25%", height: "100%", alignItems:"center"}}>
                <Form.Item
                  label="G"
                  name="g"
                  rules={[
                    {
                      required: true,
                      message: "Поле є пустим!",
                    }]}
                >                
                <Input                
                  className='inputFunction'
                  placeholder="Введіть перший оператор..."
                  style={{width:"120px"}}
                />                              
                </Form.Item>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <div style={{fontSize: "50px", display:"block"}}>=</div>
              </div>
              <img src={leftBrace} alt="" className="curly-brace-left"/>
              <div style={{ display:"flex", flexDirection:"column", width:"70%"}}>
                <div style={{display:"flex", flexDirection:"row", height:"50%", verticalAlign:"center"}}>
                  <div style={{width:"60%"}}>
                  <Form.Item
                    name="Operator1"
                      rules={[
                      {
                        required: true,
                        message: "Поле є пустим!",
                      }]}
                    >
                    <Input                
                      className='inputFunction'
                      placeholder="Введіть перший оператор..."
                      style={{width:"280px"}}
                    />
                  </Form.Item>
                </div>
                <div style={{width:"40%"}}>
                <Form.Item
                  name="Scope1"
                  label=":"
                  rules={[
                    {
                      required: true,
                      message: "Поле є пустим!",
                    }]}
                  >
                  <Input                
                    className='inputFunction'
                    placeholder="Введіть межу..."                    
                  />
                  </Form.Item>
                </div>
              </div>
              <div style={{display:"flex", flexDirection:"row",  height:"50%"}}>
                <div style={{width:"60%"}}>
                  <Form.Item
                    name="Operator2"
                    rules={[
                      {
                        required: true,
                        message: "Поле є пустим!",
                      }]}
                  >
                  <Input                
                    className='inputFunction'
                    placeholder="Введіть другий оператор..."
                    style={{width:"280px"}}
                  />
                  </Form.Item>
                  </div>
                  <div style={{width:"40%"}}>
                  <Form.Item
                    name="Scope2"
                    label=":"
                    rules={[
                      {
                        required: true,
                        message: "Поле є пустим!",
                      }]}
                  >                
                  <Input                
                    className='inputFunction'
                    placeholder="Введіть межу..."
                  />
                  </Form.Item>
                  </div>
              </div>
              </div>              
              </Row>
              <Row justify={'center'} style={{height: "75px", fontWeight: '600', fontSize: '70px'  }}>                
                <Form.Item
                  label="Початкова функція"
                  name="inputFunction"
                  rules={[
                  {
                    required: true,
                    message: "Поле є пустим!",
                  }]}
                >
                  <Input                
                    className='inputFunction'
                    placeholder="Введіть функцію..."
                    style={{width:"500px"}}                  
                />
              </Form.Item>  
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{width:"200px", height:"40px"}}
                > Обчислити</Button>
              </Form.Item>  
              </div>          
        </Form>
        { (state.dataTable!.length !== 0 && state.columns!.length !== 0) &&        
          <MainTable/>
        }
        <div style={{ display: 'flex', justifyContent:'center', flexWrap:'wrap'}}>
        {state.functionValues[0][0].length !== 0 &&      
          (state.functionValues).map((value: number[][], index1) => {
            const data = value.map((arrayOfY, index2) => ({
              x: state.graphXis,
              y: arrayOfY,
              type: 'scatter',
              mode: 'lines',
              marker: {color: randomColor()},                
              name: `U${index2+1}`
            }))
            return (
              <Plot data={data as any} layout={{ width: 800, height: 600, title: `Графік власної функції на ${index1+1}-ій ітерації`}}/>
            )
          }) 
          }</div>
        </Content>

        <Button className='scroll-to-top-button' icon={<UpOutlined style={{color: "rgb(63, 96, 121)"}}/>} onClick={scrollToTop}/>
        
        <Footer style={{paddingInline: "50px", lineHeight: "64px", background: "#001529"}}>
        </Footer>    
    </Layout>     
    )
}

        // const newCalculationSettings: CalculationSettings = {
        //     InputFunction: "1",
        //     OperatorValues: ["x", "t"],
        //     Operators: ["((2-t)*x)/2", "(t*(2-x))/2"],
        //     Scopes: ["x <= t", "x >= t"],
        //     LeftSide: "0",
        //     RightSide: "1"
        //   };

                  // const newCalculationSettings: CalculationSettings = {
          //   InputFunction: "1",
          //   OperatorValues: ["x", "t"],
          //   Operators: ["2-t", "2-x"],
          //   Scopes: ["x <= t", "x >= t"],
          //   LeftSide: "0",
          //   RightSide: "1"
          // };

          // const newCalculationSettings: CalculationSettings = {
          //   InputFunction: "sin(x)",
          //   OperatorValues: ["x", "t"],
          //   Operators: [encodeURIComponent("((3.1415926535-t)*x*(2+cos(t)))/3.1415926535"), encodeURIComponent("(t*(3.1415926535-x)*(2+cos(t)))/3.1415926535")],
          //   Scopes: ["x <= t", "x >= t"],
          //   LeftSide: "0",
          //   RightSide: "3.1415926535"
          // };