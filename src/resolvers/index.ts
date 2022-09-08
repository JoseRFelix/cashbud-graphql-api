import AccountResolver from "./account"
import AuthResolver from "./auth"
import UserResolver from "./user"

const resolvers = [AccountResolver, AuthResolver, UserResolver] as const

export default resolvers
