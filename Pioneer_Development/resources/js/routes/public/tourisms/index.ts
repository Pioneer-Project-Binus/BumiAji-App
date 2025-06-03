import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismController::index
 * @see app\Http\Controllers\TourismController.php:14
 * @route /destinasi-wisata
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/destinasi-wisata',
}

/**
 * @see \App\Http\Controllers\TourismController::index
 * @see app\Http\Controllers\TourismController.php:14
 * @route /destinasi-wisata
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismController::index
 * @see app\Http\Controllers\TourismController.php:14
 * @route /destinasi-wisata
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismController::index
 * @see app\Http\Controllers\TourismController.php:14
 * @route /destinasi-wisata
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const tourisms = {
    index, 
    show,
}

export default tourisms