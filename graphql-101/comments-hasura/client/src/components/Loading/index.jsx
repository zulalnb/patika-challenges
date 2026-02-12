import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loading() {
  return (
    <Flex align="center" justify="center">
      <Spin
        delay={300}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </Flex>
  );
}

export default Loading;
