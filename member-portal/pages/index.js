import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { Component, useState } from 'react';

import { Header } from '../components/Header'
import { Users } from '../components/Users'
import { DisplayBoard } from '../components/DisplayBoard'
// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push('/');
      })
      .catch(error => {
        setError(error.message)
      });
    event.preventDefault();
  };

  const { authUser, loading, signOut } = useAuth();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <Container className="text-center" style={{ padding: '40px 0px' }}>

      {/* Header */}
      <div className="header">
        <h1>Pikapp member portal</h1>
      </div>

      {/* if logged in */}

      {authUser &&
        <div className="home-dashboard">
          <Row>
            <Col>
              <div>Congratulations {authUser?.email}! You are logged in.</div>

            </Col>
          </Row>
            <Row>
              <Col>
                <h1>Here would be our dashboard of sorts</h1>
              </Col>
            </Row>
          <Row>
            <Col>
              <Button onClick={signOut}>Sign out</Button>
            </Col>
          </Row>
        </div>
      }

      {/* Login container */}

      {!authUser &&
        <div className="login">
          <Row>
            <Col>
              <h2>Login</h2>
            </Col>
          </Row>

          <Row style={{ maxWidth: '400px', margin: 'auto' }}>
            <Col>
              <Form onSubmit={onSubmit}>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup row>
                  <Label for="loginEmail" sm={4}>Email</Label>
                  <Col sm={8}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      name="email"
                      id="loginEmail"
                      placeholder="Email" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="loginPassword" sm={4}>Password</Label>
                  <Col sm={8}>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      id="loginPassword"
                      placeholder="Password" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button>Login</Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    No account? <Link href="/signup">Create one</Link>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>}

    </Container>
  )
}
