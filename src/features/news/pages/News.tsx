import BaseAlert from "@/common/components/BaseAlert/BaseAlert";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import React from "react";
import { useNews } from "../hooks/useNews";

const News: React.FC = () => {
  const { data: news, isLoading } = useNews();

  return (
    <BaseSection>
      <BaseFlex flexDirection="column" gap="1rem">
        {isLoading ? (
          <BaseCenter>
            <BaseSpinner />
          </BaseCenter>
        ) : news?.length ? (
          news.map((item) => (
            <BaseAlert
              key={item.id}
              status={item.status}
              title={item.title}
              message={item.message}
            />
          ))
        ) : (
          <BaseCenter>
            <BaseText>No news yet ;)</BaseText>
          </BaseCenter>
        )}
      </BaseFlex>
    </BaseSection>
  );
};

export default News;
