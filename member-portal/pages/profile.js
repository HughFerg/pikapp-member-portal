import withSession from '../auth/session'
import Layout from '../components/Layout'

export const getServerSideProps = withSession(async function ({ req, res }) {
    // Get the user's session based on the request
    const user = req.session.get('user')

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: { user },
    }
})

const Profile = ({ user }) => {
    // Show the user. No loading state is required
    return (
        <Layout>
            <h1>Your Profile</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Layout>
    )
}

export default Profile
