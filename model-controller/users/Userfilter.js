class UserFilter {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }
    search() {
        const search = this.querystr.search
            ? {
                user_login: {
                    $regex: this.querystr.search,
                    $options: 'i'
                }
            } : {};
        this.query = this.query.find({ ...search });
        return this
    }
    filter() {
        const querystrCopy = { ...this.querystr }
        // remove some filed key
        const removeKey = ['search', 'limit', 'page'];
        removeKey.forEach((key) => delete querystrCopy[key]);
        this.query = this.query.find(querystrCopy)
        return this
    }
    pagination(perPage) {
        const currentPage = Number(this.querystr.page) || 1
        const skip = perPage * (currentPage - 1)
        this.query = this.query.limit(perPage).skip(skip)
        return this
    }
}


export default UserFilter
