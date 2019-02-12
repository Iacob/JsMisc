
function make_page_config(total_pages, page_num, side_links) {
  var result = new Object();
  var from_page = page_num - side_links;
  var to_page = page_num + side_links;
  if (from_page < 1) {
    to_page = to_page + (1 - from_page);
  }
  if (to_page > total_pages) {
    from_page = from_page + (total_pages - to_page)
  }
  
  if (from_page < 1) {
    from_page = 1;
  }
  if (to_page > total_pages) {
    to_page = total_pages;
  }

  var previous_link_enabled = (from_page > 1);
  var next_link_enabled = (to_page < total_pages);
  
  return {from_page: from_page,
	  to_page: to_page,
	  previous_link_enabled: previous_link_enabled,
	  next_link_enabled: next_link_enabled};
}

//console.log(make_page_config(10, 8, 3));
