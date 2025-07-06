import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profil-desa'
 */
const showOrCreate64b10973650c616db165b8758bd680c2 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate64b10973650c616db165b8758bd680c2.url(options),
    method: 'get',
})

showOrCreate64b10973650c616db165b8758bd680c2.definition = {
    methods: ['get','head'],
    url: '/profil-desa',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profil-desa'
 */
showOrCreate64b10973650c616db165b8758bd680c2.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showOrCreate64b10973650c616db165b8758bd680c2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profil-desa'
 */
showOrCreate64b10973650c616db165b8758bd680c2.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate64b10973650c616db165b8758bd680c2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profil-desa'
 */
showOrCreate64b10973650c616db165b8758bd680c2.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showOrCreate64b10973650c616db165b8758bd680c2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profile-village/edit'
 */
const showOrCreatee64b231b455fa9e383ad591ebfd26091 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreatee64b231b455fa9e383ad591ebfd26091.url(options),
    method: 'get',
})

showOrCreatee64b231b455fa9e383ad591ebfd26091.definition = {
    methods: ['get','head'],
    url: '/profile-village/edit',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profile-village/edit'
 */
showOrCreatee64b231b455fa9e383ad591ebfd26091.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showOrCreatee64b231b455fa9e383ad591ebfd26091.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profile-village/edit'
 */
showOrCreatee64b231b455fa9e383ad591ebfd26091.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreatee64b231b455fa9e383ad591ebfd26091.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:46
 * @route '/profile-village/edit'
 */
showOrCreatee64b231b455fa9e383ad591ebfd26091.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showOrCreatee64b231b455fa9e383ad591ebfd26091.url(options),
    method: 'head',
})

export const showOrCreate = {
    '/profil-desa': showOrCreate64b10973650c616db165b8758bd680c2,
    '/profile-village/edit': showOrCreatee64b231b455fa9e383ad591ebfd26091,
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:63
 * @route '/profile-village'
 */
export const storeOrUpdate = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})

storeOrUpdate.definition = {
    methods: ['post'],
    url: '/profile-village',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:63
 * @route '/profile-village'
 */
storeOrUpdate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeOrUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:63
 * @route '/profile-village'
 */
storeOrUpdate.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})
const ProfileVillageController = { showOrCreate, storeOrUpdate }

export default ProfileVillageController