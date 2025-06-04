import { queryParams, type QueryParams } from './../../../wayfinder'

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/foto-wisata/{slug}',
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismPhotoController::show
 * @see app/Http/Controllers/TourismPhotoController.php:0
 * @route '/foto-wisata/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const tourismPhotos = {
    show,
}

export default tourismPhotos