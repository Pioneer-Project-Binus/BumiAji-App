import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
const indexc3fdd506734a8484cd25b42fdc7b5b31 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexc3fdd506734a8484cd25b42fdc7b5b31.url(options),
    method: 'get',
})

indexc3fdd506734a8484cd25b42fdc7b5b31.definition = {
    methods: ['get','head'],
    url: '/artikel',
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
indexc3fdd506734a8484cd25b42fdc7b5b31.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexc3fdd506734a8484cd25b42fdc7b5b31.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
indexc3fdd506734a8484cd25b42fdc7b5b31.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexc3fdd506734a8484cd25b42fdc7b5b31.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/artikel'
 */
indexc3fdd506734a8484cd25b42fdc7b5b31.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexc3fdd506734a8484cd25b42fdc7b5b31.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/articles'
 */
const index8f1eca8cfa0d2952fdb6b90cc946ddf6 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index8f1eca8cfa0d2952fdb6b90cc946ddf6.url(options),
    method: 'get',
})

index8f1eca8cfa0d2952fdb6b90cc946ddf6.definition = {
    methods: ['get','head'],
    url: '/articles',
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/articles'
 */
index8f1eca8cfa0d2952fdb6b90cc946ddf6.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index8f1eca8cfa0d2952fdb6b90cc946ddf6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/articles'
 */
index8f1eca8cfa0d2952fdb6b90cc946ddf6.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index8f1eca8cfa0d2952fdb6b90cc946ddf6.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::index
 * @see app/Http/Controllers/ArticleController.php:18
 * @route '/articles'
 */
index8f1eca8cfa0d2952fdb6b90cc946ddf6.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index8f1eca8cfa0d2952fdb6b90cc946ddf6.url(options),
    method: 'head',
})

export const index = {
    '/artikel': indexc3fdd506734a8484cd25b42fdc7b5b31,
    '/articles': index8f1eca8cfa0d2952fdb6b90cc946ddf6,
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/artikel/{slug}'
 */
const show869def6d3c452f5a50926ea55f17bc54 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show869def6d3c452f5a50926ea55f17bc54.url(args, options),
    method: 'get',
})

show869def6d3c452f5a50926ea55f17bc54.definition = {
    methods: ['get','head'],
    url: '/artikel/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/artikel/{slug}'
 */
show869def6d3c452f5a50926ea55f17bc54.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show869def6d3c452f5a50926ea55f17bc54.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/artikel/{slug}'
 */
show869def6d3c452f5a50926ea55f17bc54.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show869def6d3c452f5a50926ea55f17bc54.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/artikel/{slug}'
 */
show869def6d3c452f5a50926ea55f17bc54.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show869def6d3c452f5a50926ea55f17bc54.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/articles/{slug}'
 */
const show86fec96e7cf877c1b0bd578f6a396d90 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'get',
})

show86fec96e7cf877c1b0bd578f6a396d90.definition = {
    methods: ['get','head'],
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/articles/{slug}'
 */
show86fec96e7cf877c1b0bd578f6a396d90.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show86fec96e7cf877c1b0bd578f6a396d90.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/articles/{slug}'
 */
show86fec96e7cf877c1b0bd578f6a396d90.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:119
 * @route '/articles/{slug}'
 */
show86fec96e7cf877c1b0bd578f6a396d90.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'head',
})

export const show = {
    '/artikel/{slug}': show869def6d3c452f5a50926ea55f17bc54,
    '/articles/{slug}': show86fec96e7cf877c1b0bd578f6a396d90,
}

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
 * @see app/Http/Controllers/ArticleController.php:131
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
 * @see app/Http/Controllers/ArticleController.php:131
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
 * @see app/Http/Controllers/ArticleController.php:131
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
 * @see app/Http/Controllers/ArticleController.php:131
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:144
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
 * @see app/Http/Controllers/ArticleController.php:201
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
 * @see app/Http/Controllers/ArticleController.php:201
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
 * @see app/Http/Controllers/ArticleController.php:201
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