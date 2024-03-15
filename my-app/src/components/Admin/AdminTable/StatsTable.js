import { Table } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import moment from "moment";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import React, { useRef } from "react";

const StatsTable = ({ stats }) => {
  const searchInput = useRef(null);
  const sortedStats = [...stats].sort(
    (a, b) =>
      moment(b.userRankBet.createdAt).unix() -
      moment(a.userRankBet.createdAt).unix()
  );

  //   const competitionNames = [
  //     ...new Set(sortedStats.map((item) => item.rankBet.competition_name)),
  //   ];
  const competitions = [
    ...new Set(sortedStats.map((item) => item.rankBet.competition)),
  ];

  const usernames = [...new Set(sortedStats.map((item) => item.user.name))];

  const columns = [
    // {
    //   title: "Compétition",
    //   dataIndex: ["rankBet", "competition_name"],
    //   key: "name",
    //   filters: competitionNames.map((name) => ({ text: name, value: name })),
    //   onFilter: (value, record) =>
    //     record.rankBet.competition_name.includes(value),
    // },
    {
      title: "Division",
      dataIndex: ["rankBet", "competition"],
      key: "competition",
      filters: competitions.map((competition) => ({
        text: competition,
        value: competition,
      })),
      onFilter: (value, record) => record.rankBet.competition.includes(value),
    },
    {
      title: "Nom",
      dataIndex: ["user", "name"],
      key: "name",
      filters: usernames.map((name) => ({ text: name, value: name })),
      onFilter: (value, record) => record.user.name.includes(value),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Rechercher un nom`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Rechercher
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Réinitialiser
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
    },
    {
      title: "Date du pari",
      dataIndex: ["userRankBet", "createdAt"],
      key: "createdAt",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) =>
        moment(a.userRankBet.createdAt).unix() -
        moment(b.userRankBet.createdAt).unix(),
    },
    {
      title: "Gain",
      dataIndex: ["userRankBet", "gain"],
      key: "gain",
    },
    {
      title: "Type de compétition",
      dataIndex: ["userRankBet", "userRanking"],
      key: "userRanking",
      render: (userRankings) => (
        <div>
          {userRankings.map((ranking, index) => (
            <p key={index}>{`${ranking.position}: ${ranking.name}`}</p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={sortedStats}
      columns={columns}
      pagination={{ pageSize: 30 }}
    />
  );
};

export default StatsTable;
