import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
const index4c48effeb32b4cab50d9844d53f44e55 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'get',
})

index4c48effeb32b4cab50d9844d53f44e55.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata',
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index4c48effeb32b4cab50d9844d53f44e55.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourisms'
 */
const indexf2fee93d9de5a1d598f42492d1753060 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexf2fee93d9de5a1d598f42492d1753060.url(options),
    method: 'get',
})

indexf2fee93d9de5a1d598f42492d1753060.definition = {
    methods: ['get','head'],
    url: '/tourisms',
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourisms'
 */
indexf2fee93d9de5a1d598f42492d1753060.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexf2fee93d9de5a1d598f42492d1753060.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourisms'
 */
indexf2fee93d9de5a1d598f42492d1753060.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexf2fee93d9de5a1d598f42492d1753060.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourisms'
 */
indexf2fee93d9de5a1d598f42492d1753060.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexf2fee93d9de5a1d598f42492d1753060.url(options),
    method: 'head',
})

export const index = {
    '/destinasi-wisata': index4c48effeb32b4cab50d9844d53f44e55,
    '/tourisms': indexf2fee93d9de5a1d598f42492d1753060,
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/destinasi-wisata/{slug}'
 */
const show004488e211389df99553cd16e1a14fe3 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'get',
})

show004488e211389df99553cd16e1a14fe3.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show004488e211389df99553cd16e1a14fe3.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/tourisms/{slug}'
 */
const show760b268e1448be603973c6dbcbae5cce = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show760b268e1448be603973c6dbcbae5cce.url(args, options),
    method: 'get',
})

show760b268e1448be603973c6dbcbae5cce.definition = {
    methods: ['get','head'],
    url: '/tourisms/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/tourisms/{slug}'
 */
show760b268e1448be603973c6dbcbae5cce.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show760b268e1448be603973c6dbcbae5cce.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/tourisms/{slug}'
 */
show760b268e1448be603973c6dbcbae5cce.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show760b268e1448be603973c6dbcbae5cce.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:101
 * @route '/tourisms/{slug}'
 */
show760b268e1448be603973c6dbcbae5cce.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show760b268e1448be603973c6dbcbae5cce.url(args, options),
    method: 'head',
})

export const show = {
    '/destinasi-wisata/{slug}': show004488e211389df99553cd16e1a14fe3,
    '/tourisms/{slug}': show760b268e1448be603973c6dbcbae5cce,
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:47
 * @route '/tourisms/create'
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
    url: '/tourisms/create',
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:47
 * @route '/tourisms/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:47
 * @route '/tourisms/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:47
 * @route '/tourisms/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:52
 * @route '/tourisms'
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
    url: '/tourisms',
}

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:52
 * @route '/tourisms'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:52
 * @route '/tourisms'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:120
 * @route '/tourisms/{slug}/edit'
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
    url: '/tourisms/{slug}/edit',
}

/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:120
 * @route '/tourisms/{slug}/edit'
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
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:120
 * @route '/tourisms/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:120
 * @route '/tourisms/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:128
 * @route '/tourisms/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/tourisms/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:128
 * @route '/tourisms/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:128
 * @route '/tourisms/{slug}'
 */
update.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:180
 * @route '/tourisms/{slug}'
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
    url: '/tourisms/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:180
 * @route '/tourisms/{slug}'
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
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:180
 * @route '/tourisms/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const TourismController = { index, show, create, store, edit, update, destroy }

export default TourismController