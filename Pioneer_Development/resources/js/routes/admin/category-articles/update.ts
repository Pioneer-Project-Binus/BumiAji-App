import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\CategoryArticleController::update
 * @see app\Http\Controllers\CategoryArticleController.php:116
 * @route /admin/category-articles/{slug}
 */
export const update = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '\/admin\/category-articles\/{slug}',
}

/**
 * @see \App\Http\Controllers\CategoryArticleController::update
 * @see app\Http\Controllers\CategoryArticleController.php:116
 * @route /admin/category-articles/{slug}
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
 * @see \App\Http\Controllers\CategoryArticleController::update
 * @see app\Http\Controllers\CategoryArticleController.php:116
 * @route /admin/category-articles/{slug}
 */
update.put = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})


export default update