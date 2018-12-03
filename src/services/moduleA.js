import Http from './http'
export const getTestData = params => {
    return Http.get('/repos/octokit/octokit.rb')
}