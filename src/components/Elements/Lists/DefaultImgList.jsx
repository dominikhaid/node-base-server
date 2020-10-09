import {List} from 'antd';

export default function DefaultImgItem(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    // console.debug('Home CLIENT', props);
  }

  if (!props) return <></>;

  const listStyle = {
    style: {
      width: '100%',
      maxWidth: '350px',
    },
  };

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
  return (
    <List
      {...listStyle}
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
  );
}
