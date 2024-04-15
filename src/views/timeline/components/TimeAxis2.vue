<template>
    <div class="timeline_container">
      <div
        class="timeline_item"
        v-for="(item, index) in timelineList"
        :key="item.id"
      >
        <div class="timeline_grid">
          <div class="out_circle">
            <div class="in_circle"></div>
          </div>
          <div class="out_line"></div>
          <div class="out_circle" v-if="timelineList.length - 1 == index">
            <div class="in_circle"></div>
          </div>
        </div>
        <div class="timeline_content">
          <div class="timeline_content_date">{{ item.date }}</div>
          <div class="timeline_content_title">{{ item.title }}</div>
          <div class="timeline_content_desc">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      timelineList: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .timeline_container {
    --color: #333;
    --shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 0;
    padding: 0;
    .timeline_item {
      position: relative;
  
      .timeline_grid {
        text-align: center;
        position: absolute;
  
        .out_circle {
          --size: 16px;
          width: var(--size);
          height: var(--size);
          background: rgba(14, 116, 218, 0.1);
          box-shadow: var(--shadow);
          border-radius: 50%;
          display: flex;
          align-items: center;
  
          .in_circle {
            --size: 8px;
            width: var(--size);
            height: var(--size);
            margin: 0 auto;
            background: rgba(14, 116, 218, 1);
            border-radius: 50%;
            box-shadow: var(--shadow);
          }
        }
  
        .out_line {
          width: 2px;
          height: 150px;
          background: rgba(14, 116, 218, 1);
          box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
          opacity: 0.1;
          margin-left: 8px;
        }
      }
  
      .timeline_content {
        box-sizing: border-box;
        margin-left: 15px;
        height: 150px;
        padding: 0 0 0 20px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &_title {
          font-size: 14px;
          word-break: break-all;
          margin-bottom: 16px;
          color: var(--color);
          font-weight: 500;
        }
  
        &_date {
          font-size: 16px;
          color: var(--color);
          font-weight: 500;
          margin-bottom: 16px;
        }
        &_desc {
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
  
  .timeline_item:last-of-type .out_line {
    height: 190px !important;
  }
  </style>  