import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loading() {
  return (
    <Flex items="center" justify="center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </Flex>
  );
}

export default Loading;
