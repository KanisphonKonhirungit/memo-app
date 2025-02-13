import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Badge, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getMemos, createMemo, getUser } from "../api";
import { useNavigate } from "react-router-dom";
import logo from '../logout.svg';



const { Header, Content } = Layout;

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [user, setUser] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const data = await getMemos(token);
        const user = await getUser(token, userRole);
        setMemos(data);
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch memos", error);
      }
    };
    fetchMemos();
  }, [token, userRole]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const handleAddMemo = async () => {
    if (!newContent) return;
    const newMemo = { id: `${user.role}-${memos.length + 1}`, role: `${user.role}`, content: newContent, isNew: true, date: new Date() };
    setMemos([newMemo, ...memos]);
    setIsAdding(false);
    setNewContent("");

    try {
      await createMemo(token, newContent);
    } catch (error) {
      console.error("Failed to create memo", error);
    }
  };

  return (
    <Layout style={{ backgroundColor: "#181a19", minHeight: "100vh", padding: "20px" }}>
      <Header style={{ backgroundColor: "#181a19", display: "flex", justifyContent: "end", alignItems: "center", padding: "10px 20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "white", marginRight: "20px" }}>{user.email}</span>
          <img src={logo} className="App-logo" alt="logo" width={16} onClick={handleLogout} />
        </div>
      </Header>
      <Content style={{ alignSelf: "center", alignContent: "center", margin: "20px", justifyContent: "center", maxWidth: '930px' }}>
      <Row
          gutter={[10, 10]}
          justify="center"
        >
          <text
          className="memo-title"
            style={{
              color: "white",
              margin: 0,
              fontWeight: "400",
            }}
          >
            Memo Cards
            <text
            className="memo-title-count"
              style={{
                color: "white",
                margin: 0,
                fontSize: "3vh",
                fontWeight: "400",
                marginLeft: "5px"
              }}
            >
               ({memos.length + (isAdding ? ' + 1' : '')})
            </text>
          </text>
        </Row>
        <br/>
        <Row gutter={[16, 16]} justify="start" align='middle'>
          {memos.map((memo) => (
            <Col key={memo.id} xs={24} sm={12} md={8} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
              <Badge count={memo.isNew ? "NEW" : ""} color="#8C6CFF" style={{ zIndex: "1"}}>
                <Card style={{ width: "300px", height: "190px" }}>
                  <Row gutter={[16, 8]}>
                    <Col span={8}>
                      <div>{memo.id}</div>
                      <Button size="small" shape="round" style={{ backgroundColor: memo.role === "ADMIN" ? "#FF6C6F" : "#62AEFF", color: "white", borderRadius: 15 }}>
                        {memo.role}
                      </Button>
                    </Col>
                    <Col span={16}>{memo.content}</Col>
                  </Row>
                </Card>
              </Badge>
            </Col>
          ))}
          {!isAdding ? (
            <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
              <Card style={{ width: "300px", height: "190px", background: "#b9bbba", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setIsAdding(true)}>
                <PlusOutlined style={{ fontSize: 24, color: "#181a19" }} />
              </Card>
            </Col>
          ) : (
            <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
              <Card style={{ width: "300px", height: "190px" }}>
                <Row gutter={[16, 8]}>
                  <Col span={8}>
                    <div>{user.role}-{memos.length + 1}</div>
                    <Button size="small" shape="round" style={{ backgroundColor: user.role === "ADMIN" ? "#FF6C6F" : "#62AEFF", color: "white", borderRadius: 15 }}>
                        {user.role}
                    </Button>
                  </Col>
                  <Col span={16}>
                    <Input.TextArea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Type something..." />
                    <Button type="primary" onClick={handleAddMemo} style={{ marginTop: 8 }}>Save</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default MemoList;
