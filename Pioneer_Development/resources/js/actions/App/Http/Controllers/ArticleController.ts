import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
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
    url: '/artikel',
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:118
 * @route '/artikel/{slug}'
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
    url: '/artikel/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:118
 * @route '/artikel/{slug}'
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
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:118
 * @route '/artikel/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:118
 * @route '/artikel/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:62
 * @route '/articles/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/articles/create',
}

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:62
 * @route '/articles/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:62
 * @route '/articles/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:62
 * @route '/articles/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:73
 * @route '/articles'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/articles',
}

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:73
 * @route '/articles'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:73
 * @route '/articles'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:130
 * @route '/articles/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/articles/{slug}/edit',
}

/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:130
 * @route '/articles/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:130
 * @route '/articles/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:130
 * @route '/articles/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}'
 */
const update86fec96e7cf877c1b0bd578f6a396d90 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'put',
})

update86fec96e7cf877c1b0bd578f6a396d90.definition = {
    methods: ['put'],
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}'
 */
update86fec96e7cf877c1b0bd578f6a396d90.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update86fec96e7cf877c1b0bd578f6a396d90.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}'
 */
update86fec96e7cf877c1b0bd578f6a396d90.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}/update'
 */
const updatefb3e211aaeffad621cbf940d1b3375c6 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: updatefb3e211aaeffad621cbf940d1b3375c6.url(args, options),
    method: 'post',
})

updatefb3e211aaeffad621cbf940d1b3375c6.definition = {
    methods: ['post'],
    url: '/articles/{slug}/update',
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}/update'
 */
updatefb3e211aaeffad621cbf940d1b3375c6.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatefb3e211aaeffad621cbf940d1b3375c6.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:143
 * @route '/articles/{slug}/update'
 */
updatefb3e211aaeffad621cbf940d1b3375c6.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: updatefb3e211aaeffad621cbf940d1b3375c6.url(args, options),
    method: 'post',
})

export const update = {
    '/articles/{slug}': update86fec96e7cf877c1b0bd578f6a396d90,
    '/articles/{slug}/update': updatefb3e211aaeffad621cbf940d1b3375c6,
}

/**
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:200
 * @route '/articles/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:200
 * @route '/articles/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:200
 * @route '/articles/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ArticleController = { index, show, create, store, edit, update, destroy }

export default ArticleController