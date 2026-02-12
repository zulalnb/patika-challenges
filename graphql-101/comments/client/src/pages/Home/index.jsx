import { Avatar, List, Skeleton } from "antd";

const data = [
  {
    gender: "male",
    name: { title: "Mr", first: "Otto", last: "Keranen" },
    email: "otto.keranen@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "FI",
  },
  {
    gender: "male",
    name: { title: "Mr", first: "Otto", last: "Keranen" },
    email: "otto.keranen@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "FI",
  },
];

function Home() {
  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is ref ined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
