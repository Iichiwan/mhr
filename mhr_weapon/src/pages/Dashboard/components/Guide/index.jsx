import React, { useState } from 'react';
import { Form, Button, Select, Input, Table, Checkbox } from '@alifd/next';
import styles from './index.module.scss';


const Option = Select.Option;

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

class MhrWeapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dataSource = this.dataSource.bind(this);
  }

  handleSubmit = (values) => {
    this.setState({ data: values });
    console.log('Get form value:', values);
  };

  //dataSource = [{id: 1, time: '2016'}];

  dataSource = (criBoost) => {
    this.handleSubmit;
    const result = [];
    var atk = parseInt(this.state.data.WeaAtk) + parseInt(this.state.data.PlusAtk);
    var crit = parseInt(this.state.data.WeaCrit) + parseInt(this.state.data.PlusCrit);
    var blade = 1;
    switch (this.state.data.WeaBlade) {
      case 'y':
        blade = 1;
        break;
      case 'g':
        blade = 1.05;
        break;
      case 'b':
        blade = 1.2;
        break;
      case 'w':
        blade = 1.32;
        break;
      case 'p':
        blade = 1.39;
        break;
    }
    //console.log(atk,crit,blade);
    for (var i = 0; i < 8; i++) {
      result.push({
        atkLv: "攻击" + i,
        critLv0: this.WeaResult(atk, crit, blade, criBoost, i),
        critLv1: this.WeaResult(atk, crit + 5, blade, criBoost, i),
        critLv2: this.WeaResult(atk, crit + 10, blade, criBoost, i),
        critLv3: this.WeaResult(atk, crit + 15, blade, criBoost, i),
        critLv4: this.WeaResult(atk, crit + 20, blade, criBoost, i),
        critLv5: this.WeaResult(atk, crit + 25, blade, criBoost, i),
        critLv6: this.WeaResult(atk, crit + 30, blade, criBoost, i),
        critLv7: this.WeaResult(atk, crit + 40, blade, criBoost, i),
      });
    }
    return result;
  };

  WeaResult(atk, crit, blade, criBoost, atkLv) {
    switch (atkLv) {
      case 0:
        break;
      case 1:
        atk += 3;
        break;
      case 2:
        atk += 6;
        break;
      case 3:
        atk += 9;
        break;
      case 4:
        atk = (atk+7)*1.05;
        break;
      case 5:
        atk = (atk+8)*1.06;
        break;
      case 6:
        atk = (atk+9)*1.08;
        break;
      case 7:
        atk = (atk+10)*1.1;
        break;
    }

    if (crit > 100) crit = 100;
    var result = (atk * crit / 100 * criBoost + atk * (1 - crit / 100)) * blade;
    if (crit < 0) {
      crit = crit * -1;
      result = (atk * crit / 100 * 0.75 + atk * (1 - crit / 100)) * blade;
    }
    //console.log(atk, crit, blade, criBoost, atkLv,result);
    result=result.toFixed(2);
    return result;
  }

  render() {
    return (
      <Form style={{ width: '60%' }} {...formItemLayout} >
        <FormItem>
          <Input addonTextBefore="武器攻击" name="WeaAtk" placeholder="Medium" defaultValue="100" aria-label="Medium" aria-labelledby="J_InputMedium" style={{ width: 200 }} />
        </FormItem>
        <FormItem>
          <Input addonTextBefore="武器会心" name="WeaCrit" addonTextAfter="%" placeholder="Medium" defaultValue="0" aria-label="Medium" aria-labelledby="J_InputMedium" style={{ width: 200 }} />
        </FormItem>
        <FormItem>
          <Select id="basic-demo" label="武器斩味" name="WeaBlade" defaultValue="g" aria-label="name is" showSearch hasClear>
            <Option value="y">黄</Option>
            <Option value="g">绿</Option>
            <Option value="b">蓝</Option>
            <Option value="w">白</Option>
            <Option value="p">紫</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input addonTextBefore="附加攻击" name="PlusAtk" placeholder="Medium" defaultValue="15" aria-label="Medium" aria-labelledby="J_InputMedium" style={{ width: 200 }} />
        </FormItem>
        <FormItem>
          <Input addonTextBefore="附加会心" name="PlusCrit" addonTextAfter="%" placeholder="Medium" defaultValue="50" aria-label="Medium" aria-labelledby="J_InputMedium" style={{ width: 200 }} />
        </FormItem>
        <FormItem label=" ">
          <Form.Submit onClick={this.handleSubmit}>Confirm</Form.Submit>
        </FormItem>
        <Table dataSource={this.dataSource(1.25)}>
          <Table.Column title="超会心0" dataIndex="atkLv" />
          <Table.Column title="看破0" dataIndex="critLv0" />
          <Table.Column title="看破1" dataIndex="critLv1" />
          <Table.Column title="看破2" dataIndex="critLv2" />
          <Table.Column title="看破3" dataIndex="critLv3" />
          <Table.Column title="看破4" dataIndex="critLv4" />
          <Table.Column title="看破5" dataIndex="critLv5" />
          <Table.Column title="看破6" dataIndex="critLv6" />
          <Table.Column title="看破7" dataIndex="critLv7" />
        </Table>
        <Table dataSource={this.dataSource(1.3)}>
          <Table.Column title="超会心1" dataIndex="atkLv" />
          <Table.Column title="看破0" dataIndex="critLv0" />
          <Table.Column title="看破1" dataIndex="critLv1" />
          <Table.Column title="看破2" dataIndex="critLv2" />
          <Table.Column title="看破3" dataIndex="critLv3" />
          <Table.Column title="看破4" dataIndex="critLv4" />
          <Table.Column title="看破5" dataIndex="critLv5" />
          <Table.Column title="看破6" dataIndex="critLv6" />
          <Table.Column title="看破7" dataIndex="critLv7" />
        </Table>
        <Table dataSource={this.dataSource(1.35)}>
          <Table.Column title="超会心2" dataIndex="atkLv" />
          <Table.Column title="看破0" dataIndex="critLv0" />
          <Table.Column title="看破1" dataIndex="critLv1" />
          <Table.Column title="看破2" dataIndex="critLv2" />
          <Table.Column title="看破3" dataIndex="critLv3" />
          <Table.Column title="看破4" dataIndex="critLv4" />
          <Table.Column title="看破5" dataIndex="critLv5" />
          <Table.Column title="看破6" dataIndex="critLv6" />
          <Table.Column title="看破7" dataIndex="critLv7" />
        </Table>
        <Table dataSource={this.dataSource(1.4)}>
          <Table.Column title="超会心3" dataIndex="atkLv" />
          <Table.Column title="看破0" dataIndex="critLv0" />
          <Table.Column title="看破1" dataIndex="critLv1" />
          <Table.Column title="看破2" dataIndex="critLv2" />
          <Table.Column title="看破3" dataIndex="critLv3" />
          <Table.Column title="看破4" dataIndex="critLv4" />
          <Table.Column title="看破5" dataIndex="critLv5" />
          <Table.Column title="看破6" dataIndex="critLv6" />
          <Table.Column title="看破7" dataIndex="critLv7" />
        </Table>
      </Form>

    );
  }
}



const Guide = () => {

  return (
    <div className={styles.container}>
      <MhrWeapon />
    </div>
  );
};



export default Guide;