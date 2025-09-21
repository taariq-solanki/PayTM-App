// Simple test script to test money transfer
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1';

async function testTransfer() {
    try {
        console.log('🚀 Testing PayTM Transfer System...\n');

        // Step 1: Create test users
        console.log('1. Creating test users...');
        const testUsers = [
            { username: 'alice@test.com', password: 'password123', firstname: 'Alice', lastname: 'Smith' },
            { username: 'bob@test.com', password: 'password123', firstname: 'Bob', lastname: 'Johnson' }
        ];

        for (const user of testUsers) {
            try {
                const response = await axios.post(`${BASE_URL}/user/signup`, user);
                console.log(`✅ Created user: ${user.username}`);
            } catch (error) {
                if (error.response?.data?.msg === 'user already exists') {
                    console.log(`ℹ️  User already exists: ${user.username}`);
                } else {
                    console.log(`❌ Error creating ${user.username}:`, error.response?.data?.msg);
                }
            }
        }

        // Step 2: Sign in as Alice
        console.log('\n2. Signing in as Alice...');
        const aliceLogin = await axios.post(`${BASE_URL}/user/signin`, {
            username: 'alice@test.com',
            password: 'password123'
        });
        const aliceToken = aliceLogin.data.token;
        console.log('✅ Alice signed in successfully');

        // Step 3: Check Alice's balance
        console.log('\n3. Checking Alice\'s balance...');
        const aliceBalance = await axios.get(`${BASE_URL}/account/balance`, {
            headers: { Authorization: `Bearer ${aliceToken}` }
        });
        console.log(`💰 Alice's balance: ${aliceBalance.data.balance}`);

        // Step 4: Transfer money from Alice to Bob
        console.log('\n4. Transferring 100 from Alice to Bob...');
        const transferResponse = await axios.post(`${BASE_URL}/account/transfer`, {
            to: 'bob@test.com',
            amount: 100
        }, {
            headers: { Authorization: `Bearer ${aliceToken}` }
        });
        console.log('✅ Transfer result:', transferResponse.data.msg);

        // Step 5: Check Alice's balance after transfer
        console.log('\n5. Checking Alice\'s balance after transfer...');
        const aliceNewBalance = await axios.get(`${BASE_URL}/account/balance`, {
            headers: { Authorization: `Bearer ${aliceToken}` }
        });
        console.log(`💰 Alice's new balance: ${aliceNewBalance.data.balance}`);

        // Step 6: Sign in as Bob and check his balance
        console.log('\n6. Signing in as Bob and checking his balance...');
        const bobLogin = await axios.post(`${BASE_URL}/user/signin`, {
            username: 'bob@test.com',
            password: 'password123'
        });
        const bobToken = bobLogin.data.token;
        
        const bobBalance = await axios.get(`${BASE_URL}/account/balance`, {
            headers: { Authorization: `Bearer ${bobToken}` }
        });
        console.log(`💰 Bob's balance: ${bobBalance.data.balance}`);

        console.log('\n🎉 Transfer test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testTransfer();
