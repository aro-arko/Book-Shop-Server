"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this.query.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = [
            'search',
            'sortBy',
            'sortOrder',
            'limit',
            'page',
            'fields',
        ];
        excludeFields.forEach((field) => delete queryObj[field]);
        // Handle filter for author or category
        if (queryObj.filter) {
            const filterValue = queryObj.filter;
            const validCategories = [
                'Fiction',
                'Science',
                'SelfDevelopment',
                'Poetry',
                'Religious',
            ];
            if (validCategories.includes(filterValue)) {
                queryObj.category = filterValue;
            }
            else {
                queryObj.author = filterValue;
            }
            delete queryObj.filter;
        }
        // Handle price range
        const priceFilter = {};
        if (queryObj.minPrice) {
            priceFilter.$gte = Number(queryObj.minPrice);
            delete queryObj.minPrice;
        }
        if (queryObj.maxPrice) {
            priceFilter.$lte = Number(queryObj.maxPrice);
            delete queryObj.maxPrice;
        }
        if (Object.keys(priceFilter).length > 0) {
            queryObj.price = priceFilter;
        }
        // Handle inStock true/false filter
        if (queryObj.inStock !== undefined) {
            const inStockValue = queryObj.inStock.toLowerCase();
            queryObj.inStock = inStockValue === 'true';
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy || 'createdAt';
        const sortOrder = this.query.sortOrder === 'asc' ? '' : '-';
        const sortString = `${sortOrder}${sortBy}`;
        this.modelQuery = this.modelQuery.sort(sortString);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fields = (_b = (_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ');
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
