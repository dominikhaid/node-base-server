import {
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader,
  Layout,
  List,
  Avatar,
  Card,
  Menu,
  Breadcrumb,
  Typography,
} from 'antd';

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Title} = Typography;
const {Header, Footer, Sider, Content} = Layout;
const {Option} = Select;
const {Meta} = Card;
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

import React from 'react';

export default function Ant(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  return (
    <React.Fragment>
      <RenderLayout />
    </React.Fragment>
  );
}
//ant.design/components/layout/

const RenderLayout = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title>h1. Ant Design</Title>
        </Header>
        <Layout>
          <Sider width={200}>
            <RenderSidebar />
          </Sider>
          <Content>
            <RenderMain />
          </Content>
        </Layout>
        <Footer>
          <RenderBreadcrumb />
        </Footer>
      </Layout>
    </>
  );
};

const RenderForm = () => {
  return (
    <React.Fragment>
      <div className="site-input-group-wrapper">
        <Input.Group size="large">
          <Row gutter={8}>
            <Col span={5}>
              <Input defaultValue="0571" />
            </Col>
            <Col span={8}>
              <Input defaultValue="26888888" />
            </Col>
          </Row>
        </Input.Group>
        <br />
        <Input.Group compact>
          <Input style={{width: '20%'}} defaultValue="0571" />
          <Input style={{width: '30%'}} defaultValue="26888888" />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Input
            style={{width: '50%'}}
            defaultValue="Xihu District, Hangzhou"
          />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Input style={{width: '20%'}} defaultValue="0571" />
          <Input.Search style={{width: '30%'}} defaultValue="26888888" />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
          </Select>
          <Input style={{width: '50%'}} defaultValue="input content" />
          <InputNumber />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Input style={{width: '50%'}} defaultValue="input content" />
          <DatePicker style={{width: '50%'}} />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Input style={{width: '30%'}} defaultValue="input content" />
          <DatePicker.RangePicker style={{width: '70%'}} />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select defaultValue="Option1-1">
            <Option value="Option1-1">Option1-1</Option>
            <Option value="Option1-2">Option1-2</Option>
          </Select>
          <Select defaultValue="Option2-2">
            <Option value="Option2-1">Option2-1</Option>
            <Option value="Option2-2">Option2-2</Option>
          </Select>
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select defaultValue="1">
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
          <Input
            style={{width: 100, textAlign: 'center'}}
            placeholder="Minimum"
          />
          <Input
            className="site-input-split"
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
          />
          <Input
            className="site-input-right"
            style={{
              width: 100,
              textAlign: 'center',
            }}
            placeholder="Maximum"
          />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select defaultValue="Sign Up" style={{width: '30%'}}>
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          <AutoComplete
            style={{width: '70%'}}
            placeholder="Email"
            options={[{value: 'text 1'}, {value: 'text 2'}]}
          />
        </Input.Group>
        <br />
        <Input.Group compact>
          <Select style={{width: '30%'}} defaultValue="Home">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
          <Cascader
            style={{width: '70%'}}
            options={options}
            placeholder="Select Address"
          />
        </Input.Group>
      </div>
    </React.Fragment>
  );
};

const RenderMain = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <RenderList />
        </Col>
        <Col span={8}>
          <RenderForm></RenderForm>
        </Col>
        <Col span={8}>
          <RenderCard />
        </Col>
      </Row>
    </>
  );
};

const RenderList = () => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

const RenderCard = () => {
  return (
    <Card
      hoverable
      style={{width: 240}}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

const RenderSidebar = () => {
  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <Menu
      // onClick={}
      style={{width: 200}}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <MailOutlined />
            <span>Navigation One</span>
          </span>
        }
      >
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <SettingOutlined />
            <span>Navigation Three</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const RenderBreadcrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application Center</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
};
