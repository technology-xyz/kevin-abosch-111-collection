/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { Button, Image } from "react-bootstrap";
import { IconEyes, IconFish, ItemTemp } from "assets/images";
import { LeaderboardItemContainer } from "./style";
import { preUrl } from "config";
import { getMediaType, show_digit_number } from "service/utils";
import moment from "moment";
import { arweaveUrl } from "config";

const video_contents = [
  'cfhKMEd_pCZHHIKeVGZAilnITonqllwkA_yhiF2PaOw',
  'HEcP1vyyHXjLVZ8ote2rphHq7wsvcVPr7RnMyAh2ZJE',
  '_gk1ZNumV6a0vuqhVr5v6w1RYfoi-pArn-JKpU5eWZU',
  'kpaWOQ6Uv8EdgG3acRwyijjTpRXDGF-w_VORPzG-3bQ'
]

function LeaderboardItem({
  item = {},
  order,
  onClickItem = () => {},
  onClickUsername = () => {},
  onClickShare = () => {},
  onClickEmbed = () => {},
}) {

  const show_content = (item) => {
    if(video_contents.includes(item.txIdContent) || getMediaType(item?.contentType) === 'video' ) {
      // video content
      let res = true // mediaExists(item.txIdContent)
      if(res){
        return (
          <div className="video-area">
            <video height="400" controls muted>
              <source src={`${arweaveUrl}${item.txIdContent}`} />
            </video>
          </div>
        )
      }else{
        return (<Image
          src={ItemTemp}
          onError={(ev => ev.target.src = ItemTemp)}
          className="cursor"
          onClick={onClickItem}
        />)
      }
    }else{
      return (
        <Image
          src={
            item.txIdContent && item.owner
              ? `${preUrl}${"RPXiKRyMEWoxuHCZqVPbn85NUfIiamkSBPe6iXBfjfo"}?t=${Math.random() * 999999}`
              : ItemTemp
          }
          onError={(ev => ev.target.src = ItemTemp)}
          className="cursor"
          onClick={onClickItem}
        />)
    }
  }

  return (
    <LeaderboardItemContainer>
      <div className="item-container">
        <div className="part-left">
          <div className="item-img-wrapper item-col">
            <div className="w30">
              <h3 className="item-order mb-0">{order}</h3>
            </div>
            {show_content(item)}
          </div>
          <div className="item-info-wrapper item-col">
            <h2 className="item-title mb-1 cursor" onClick={onClickItem}>{item.title? item.title : item.name}</h2>
            <p className="item-username mb-3 cursor" onClick={onClickUsername}>
              {item.name}
            </p>
            <p className="item-created_at mb-0">
              <span className="hidden-479">Registered:</span> {moment(item.created_at).format("MMM, DD, YYYY")}
            </p>
            <a
              href={`https://viewblock.io/arweave/tx/${item.txIdContent}`}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-block mb-0"
            >
              explore block
            </a>
          </div>
        </div>
        <div className="part-right">
          <div className="item-reviews-wrapper item-col">
            <h5 className="item-total_reviews mb-0">
              {show_digit_number(item.totalViews)}
              <span className="ml-2">
                <Image src={IconEyes} />
              </span>
            </h5>
            <h5 className="item-rewards mb-0">
              {show_digit_number(item.totalReward)}{" "}
              <span className="ml-1">
                <Image src={IconFish} width={18} />
              </span>
            </h5>
          </div>
          <div className="share-wrapper">
            <div className="btns-wrapper">
              <Button className="btn-share btn-blue" onClick={onClickShare}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="gradient-boarder"></div>
    </LeaderboardItemContainer>
  );
}

export default memo(LeaderboardItem);
