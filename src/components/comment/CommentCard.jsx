import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import React from "react";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Text from "@/components/typography/Text";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";

const CommentCard = () => {
  return (
    <Wrapper col="true" className="relative">
      <Wrapper>
        <Image
          className="w-10 h-10 !rounded-full"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        />

        <Wrapper col="true" className="!gap-0">
          <Heading>Bao Nguyen Luu Quoc</Heading>
          <SubHeading>s3877698@gmail.com</SubHeading>
        </Wrapper>
      </Wrapper>

      <Wrapper>
        <Text>
          This such an amazing place that I have ever tried. Thank you for
          recommend this place, Bao!
        </Text>
      </Wrapper>

      {/* like, unlike, reply */}
      <Wrapper className="items-center self-end">
        <Wrapper className="items-center">
          <BsReply />
          <Text>10</Text>
        </Wrapper>
        <Wrapper className="items-center">
          <AiOutlineLike />
          <Text>30</Text>
        </Wrapper>
        <Wrapper className="items-center">
          <AiOutlineDislike />
          <Text>10</Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default CommentCard;
