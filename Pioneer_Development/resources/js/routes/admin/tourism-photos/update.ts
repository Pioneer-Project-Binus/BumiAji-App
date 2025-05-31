import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
 */
export const update = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '\/admin\/tourism-photos\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
 */
update.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::update
 * @see app\Http\Controllers\TourismPhotoController.php:122
 * @route /admin/tourism-photos/{slug}
 */
update.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


export default update