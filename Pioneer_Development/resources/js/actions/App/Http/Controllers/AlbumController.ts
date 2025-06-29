import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
const index73ec12b62d8329f639c52fdab37444d0 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index73ec12b62d8329f639c52fdab37444d0.url(options),
    method: 'get',
})

index73ec12b62d8329f639c52fdab37444d0.definition = {
    methods: ['get','head'],
    url: '/album-galeri',
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index73ec12b62d8329f639c52fdab37444d0.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index73ec12b62d8329f639c52fdab37444d0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index73ec12b62d8329f639c52fdab37444d0.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index73ec12b62d8329f639c52fdab37444d0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index73ec12b62d8329f639c52fdab37444d0.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index73ec12b62d8329f639c52fdab37444d0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/albums'
 */
const index1a4d1829bf809cce5d46da7256560962 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index1a4d1829bf809cce5d46da7256560962.url(options),
    method: 'get',
})

index1a4d1829bf809cce5d46da7256560962.definition = {
    methods: ['get','head'],
    url: '/albums',
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/albums'
 */
index1a4d1829bf809cce5d46da7256560962.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index1a4d1829bf809cce5d46da7256560962.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/albums'
 */
index1a4d1829bf809cce5d46da7256560962.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index1a4d1829bf809cce5d46da7256560962.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/albums'
 */
index1a4d1829bf809cce5d46da7256560962.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index1a4d1829bf809cce5d46da7256560962.url(options),
    method: 'head',
})

export const index = {
    '/album-galeri': index73ec12b62d8329f639c52fdab37444d0,
    '/albums': index1a4d1829bf809cce5d46da7256560962,
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/album-galeri/{slug}'
 */
const show4a19fc08e14740583fc7e0040c5c047c = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4a19fc08e14740583fc7e0040c5c047c.url(args, options),
    method: 'get',
})

show4a19fc08e14740583fc7e0040c5c047c.definition = {
    methods: ['get','head'],
    url: '/album-galeri/{slug}',
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/album-galeri/{slug}'
 */
show4a19fc08e14740583fc7e0040c5c047c.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show4a19fc08e14740583fc7e0040c5c047c.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/album-galeri/{slug}'
 */
show4a19fc08e14740583fc7e0040c5c047c.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show4a19fc08e14740583fc7e0040c5c047c.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/album-galeri/{slug}'
 */
show4a19fc08e14740583fc7e0040c5c047c.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show4a19fc08e14740583fc7e0040c5c047c.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/albums/{slug}'
 */
const show2a4cce35ebfb533ec3b6bbbdf81b299b = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show2a4cce35ebfb533ec3b6bbbdf81b299b.url(args, options),
    method: 'get',
})

show2a4cce35ebfb533ec3b6bbbdf81b299b.definition = {
    methods: ['get','head'],
    url: '/albums/{slug}',
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/albums/{slug}'
 */
show2a4cce35ebfb533ec3b6bbbdf81b299b.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show2a4cce35ebfb533ec3b6bbbdf81b299b.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/albums/{slug}'
 */
show2a4cce35ebfb533ec3b6bbbdf81b299b.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show2a4cce35ebfb533ec3b6bbbdf81b299b.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:107
 * @route '/albums/{slug}'
 */
show2a4cce35ebfb533ec3b6bbbdf81b299b.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show2a4cce35ebfb533ec3b6bbbdf81b299b.url(args, options),
    method: 'head',
})

export const show = {
    '/album-galeri/{slug}': show4a19fc08e14740583fc7e0040c5c047c,
    '/albums/{slug}': show2a4cce35ebfb533ec3b6bbbdf81b299b,
}

/**
* @see \App\Http\Controllers\AlbumController::create
 * @see app/Http/Controllers/AlbumController.php:57
 * @route '/albums/create'
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
    url: '/albums/create',
}

/**
* @see \App\Http\Controllers\AlbumController::create
 * @see app/Http/Controllers/AlbumController.php:57
 * @route '/albums/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::create
 * @see app/Http/Controllers/AlbumController.php:57
 * @route '/albums/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::create
 * @see app/Http/Controllers/AlbumController.php:57
 * @route '/albums/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AlbumController::store
 * @see app/Http/Controllers/AlbumController.php:62
 * @route '/albums'
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
    url: '/albums',
}

/**
* @see \App\Http\Controllers\AlbumController::store
 * @see app/Http/Controllers/AlbumController.php:62
 * @route '/albums'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::store
 * @see app/Http/Controllers/AlbumController.php:62
 * @route '/albums'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AlbumController::edit
 * @see app/Http/Controllers/AlbumController.php:137
 * @route '/albums/{slug}/edit'
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
    url: '/albums/{slug}/edit',
}

/**
* @see \App\Http\Controllers\AlbumController::edit
 * @see app/Http/Controllers/AlbumController.php:137
 * @route '/albums/{slug}/edit'
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
* @see \App\Http\Controllers\AlbumController::edit
 * @see app/Http/Controllers/AlbumController.php:137
 * @route '/albums/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::edit
 * @see app/Http/Controllers/AlbumController.php:137
 * @route '/albums/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AlbumController::update
 * @see app/Http/Controllers/AlbumController.php:146
 * @route '/albums/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/albums/{slug}',
}

/**
* @see \App\Http\Controllers\AlbumController::update
 * @see app/Http/Controllers/AlbumController.php:146
 * @route '/albums/{slug}'
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
* @see \App\Http\Controllers\AlbumController::update
 * @see app/Http/Controllers/AlbumController.php:146
 * @route '/albums/{slug}'
 */
update.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AlbumController::destroy
 * @see app/Http/Controllers/AlbumController.php:202
 * @route '/albums/{slug}'
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
    url: '/albums/{slug}',
}

/**
* @see \App\Http\Controllers\AlbumController::destroy
 * @see app/Http/Controllers/AlbumController.php:202
 * @route '/albums/{slug}'
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
* @see \App\Http\Controllers\AlbumController::destroy
 * @see app/Http/Controllers/AlbumController.php:202
 * @route '/albums/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const AlbumController = { index, show, create, store, edit, update, destroy }

export default AlbumController